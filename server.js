const path = require('path');

const express = require('express');

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const app = express();

// Serve static files
app.use(express.static(path.join(process.cwd(), 'dist')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://${SERVER_HOSTNAME}:${SERVER_PORT}`);
});