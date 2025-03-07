const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve js files from the "src" directory
app.use(express.static(path.join(__dirname, 'src')));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});