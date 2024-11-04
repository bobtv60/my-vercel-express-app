const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World! This is your Express app on Vercel.');
});

// Another route example
app.get('/about', (req, res) => {
  res.send('About page content here.');
});

// POST route example
app.post('/submit', (req, res) => {
  const { name, message } = req.body; // Destructure the data from the request body

  // Simple response logic
  if (name && message) {
    res.status(200).send(`Hello, ${name}! Your message: "${message}" was received.`);
  } else {
    res.status(400).send('Please provide both name and message.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export the app for Vercel
module.exports = app;
