require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

const SECRET_KEY = process.env.SECRET_KEY || 'defaultsecret';

// Dummy users
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'Saggu', password: 'emp123', role: 'employee' },
  { username: 'Hansraj', password: 'hans', role: 'employee' }
];

// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  const user = users.find(u => u.username === username && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ message: 'Invalid Credentials' });

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '10s' });

  // Store token in HTTP-only cookie
  res.cookie('token', token, { 
    httpOnly: true, 
    secure: false, 
    sameSite: 'lax', 
    maxAge: 10000 // 10 seconds in milliseconds
  });
  
  return res.json({ message: 'Login successful', role: user.role });
});

// LOGOUT ROUTE (CLEAR COOKIE)
app.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'lax' });
  res.json({ message: 'Logged out successfully' });
});

app.get('/verify-token', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }
    res.json({ valid: true, user: decoded });
  });
});

app.listen(8000, () => console.log('BACKEND RUNNING ON http://localhost:8000'));
