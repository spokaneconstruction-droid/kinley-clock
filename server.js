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
    if (query.query) {
      query.query['$'] = { ...query.query['$'], grantKey: JOBTREAD_GRANT_KEY };
    }
    const response = await fetch(JOBTREAD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('JobTread proxy error:', err);
    res.status(500).json({ error: 'Proxy request failed' });
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
