const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const User = require('./models/user');
const bcrypt = require('bcrypt');

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

app.post('/signup', async (req, res) => {
  try {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name === "" || email === "" || password === "" || dateOfBirth === "") {
      return res.json({ status: "FAILED", message: "Empty input fields" });
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      return res.json({ status: "FAILED", message: "Invalid name entered" });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.json({ status: "FAILED", message: "Invalid email entered" });
    } else if (!new Date(dateOfBirth).getTime()) {
      return res.json({ status: "FAILED", message: "Invalid date of birth entered" });
    } else if (password.length < 8) {
      return res.json({ status: "FAILED", message: "Password is too short" });
    }

    const existingUser = await User.find({ email });
    if (existingUser.length) {
      return res.json({ status: "FAILED", message: "User with the provided email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, email, password: hashedPassword, dateOfBirth });
    const result = await newUser.save();

    res.json({ status: "SUCCESS", message: "Signup successful", data: result });
  } catch (err) {
    console.error('Error during signup:', err);
    res.json({ status: "FAILED", message: "An error occurred during signup" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export the app for Vercel
module.exports = app;
