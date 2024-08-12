const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Hardcoded users
const users = [
  { username: 'boussarhane', password: 'heyati123@@' },
  { username: 'bahara', password: 'heyathom123@@' },
];

// User authentication route
router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
    res.json({ success: true, token, username: user.username });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

module.exports = router;
