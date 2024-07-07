const express = require('express');
const { authenticateAdmin } = require('./auth');
const connection = require('./db');

const router = express.Router();

router.post('/', authenticateAdmin, (req, res) => {
  const { title, description, imageUrl, ingredients, instructions, servings, prepTime, ingredientQuantities } = req.body;
  const query = 'INSERT INTO recipes (title, description, imageUrl, ingredients, instructions, servings, prepTime, ingredientQuantities) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [title, description, imageUrl, ingredients, instructions, servings, prepTime, JSON.stringify(ingredientQuantities)], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(`Recipe added with ID: ${results.insertId}`);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM recipes WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Recipe not found');
    const recipe = results[0];
    recipe.ingredientQuantities = JSON.parse(recipe.ingredientQuantities); // Parse JSON
    res.json(recipe);
  });
});

module.exports = router;
