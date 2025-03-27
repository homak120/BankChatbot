const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const { Readable } = require('stream');

const app = express();
const PORT = 5566;
const OLLAMA_API_URL = 'http://localhost:11434';
const RAG_API_URL = 'http://localhost:5567';

app.use(express.json());
app.use(cors()); // This will allow requests from any origin

// Or to restrict to a specific domain:
// app.use(cors({ origin: 'https://www.example.com' }));


// Use the proxy middleware to forward all requests to the Ollama server
//app.use('/api/generate', proxy(OLLAMA_API_URL + '/generate'));

app.post('/api/generate', async (req, res) => {
  try {
    console.log('Income Request:', req.body);
    console.dir(req.body, { depth: null, colors: true });
    user_query = req.body.prompt;

    const ragResponse = await fetch(`${RAG_API_URL}/retrieveAdditionalKnowledge?userQuery=${encodeURIComponent(user_query)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!ragResponse.ok) {
      throw new Error(`RAG API error: ${ragResponse.statusText}`);
    }
    
    const ragData = await ragResponse.json();
    ragData.listOfAdditionalKnowledge.forEach((element) => {
          user_query += '\n\n' + element.text;
      }
    );
    
    req.body.prompt = user_query;
    console.log('body:', req.body.prompt);

    const response = await fetch(OLLAMA_API_URL + '/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    if (req.body.stream) {
      // Convert web ReadableStream to Node.js Readable stream then pipe
      Readable.fromWeb(response.body).pipe(res);
    } else {
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    console.error('Error communicating with Ollama API:', error);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Ollama Proxy server is running on http://localhost:${PORT}`);
});