const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();
const PORT = 5566;
const OLLAMA_API_URL = 'http://localhost:11434';

app.use(express.json());
app.use(cors()); // This will allow requests from any origin

// Or to restrict to a specific domain:
// app.use(cors({ origin: 'https://www.example.com' }));


// Use the proxy middleware to forward all requests to the Ollama server
//app.use('/api/generate', proxy(OLLAMA_API_URL + '/generate'));

app.post('/api/generate', async (req, res) => {
  try {
    console.log('Income Request:', req.body);
    //const { prompt } = req.body;
    console.dir(req.body, { depth: null, colors: true });
    const response = await fetch(OLLAMA_API_URL + '/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error communicating with Ollama API:', error);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Ollama Proxy server is running on http://localhost:${PORT}`);
});