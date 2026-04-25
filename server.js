const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const JOBTREAD_GRANT_KEY = process.env.JOBTREAD_GRANT_KEY || '';
const JOBTREAD_API = 'https://api.jobtread.com/pave';

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Kinley Clock running on port ${PORT}`);
  console.log(`Serving static files from: ${publicPath}`);
});
