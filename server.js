const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World! This is your Express app on Vercel.');
});

// Another route example
app.get('/about', (req, res) => {
  res.send('About page content here.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export the app for Vercel
module.exports = app;
