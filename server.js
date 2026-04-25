const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const JOBTREAD_GRANT_KEY = process.env.JOBTREAD_GRANT_KEY || '22TNNMMpHK5dpWvxunGCAGi5QAwRmi6LSc';
const JOBTREAD_API = 'https://api.jobtread.com/pave';

// API route MUST come before static files
app.post('/api/jobtread', async (req, res) => {
  try {
    const query = req.body;

    // Inject grantKey at the top-level query.$ only.
    // JobTread Pave API accepts grantKey at query.$ for auth but rejects it
    // inside individual operation $ fields (e.g. createTimeEntry.$).
    if (query.query) {
      query.query['$'] = { ...query.query['$'], grantKey: JOBTREAD_GRANT_KEY };
    }

    const response = await fetch(JOBTREAD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    });

    // Read as text first so we can diagnose non-JSON responses
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      // JobTread returned non-JSON -- likely an auth or format error
      console.error('JobTread non-JSON response:', response.status, text.substring(0, 500));
      return res.status(502).json({
        error: 'Non-JSON response from JobTread',
        jobtreadStatus: response.status,
        body: text.substring(0, 1000)
      });
    }

    // Forward JobTread's status code so the client can see errors too
    res.status(response.ok ? 200 : response.status).json(data);

  } catch (err) {
    console.error('JobTread proxy error:', err.message);
    res.status(500).json({ error: 'Proxy request failed', message: err.message });
  }
});

// Static files AFTER API routes
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback - LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Kinley Clock running on port ${PORT}`);
});
