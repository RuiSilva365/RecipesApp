const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('./db');

const router = express.Router();
const secretKey = 'ruisilva23480'; 

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(400).send('Invalid credentials');

    const token = jwt.sign(
      { userId: results[0].id, email: results[0].email, role: results[0].role },
      secretKey,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  });
});

// Middleware to protect admin routes
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    if (user.role !== 'admin') return res.status(403).send('Access Denied');
    req.user = user;
    next();
  });
};

module.exports = { router, authenticateAdmin };


// Register User route
app.post('/auth/register', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Verificar se o usuário já existe
  const queryCheck = 'SELECT * FROM users WHERE email = ?';
  connection.query(queryCheck, [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) return res.status(400).send('User already exists');

    // Inserir novo usuário
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    connection.query(query, [email, password, role || 'user'], (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('User registered successfully');
    });
  });
});