const express = require('express');
const connection = require('./db');
const { authenticateAdmin } = require('./auth');

const router = express.Router();

router.post('/recipes', authenticateAdmin, (req, res) => {
  const { title, description, imageUrl, ingredients, instructions } = req.body;
  const query = 'INSERT INTO recipes (title, description, imageUrl, ingredients, instructions) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [title, description, imageUrl, ingredients, instructions], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(`Recipe added with ID: ${results.insertId}`);
  });
});

// Other recipe routes (e.g., GET, PUT, DELETE) can be added here

module.exports = router;
