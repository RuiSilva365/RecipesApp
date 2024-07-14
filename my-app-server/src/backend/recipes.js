const express = require('express');
const { authenticateAdmin } = require('./auth');
const connection = require('./db');

const router = express.Router();

// Helper function to send error responses
const sendErrorResponse = (res, message, status = 500) => res.status(status).json({ error: message });

router.post('/', authenticateAdmin, (req, res) => {
  const { title, description, imageUrl, ingredients, instructions, servings, prepTime, ingredientQuantities } = req.body;

  // Validate required fields
  if (!title || !description || !ingredients || !instructions) {
    return sendErrorResponse(res, 'Title, description, ingredients, and instructions are required', 400);
  }

  const query = 'INSERT INTO recipes (title, description, imageUrl, ingredients, instructions, servings, prepTime, ingredientQuantities, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [title, description, imageUrl, ingredients, JSON.stringify(instructions), servings, prepTime, JSON.stringify(ingredientQuantities), null], (err, results) => {
    if (err) return sendErrorResponse(res, 'Error adding recipe');
    res.status(201).json({ message: 'Recipe added', id: results.insertId });
  });
});

router.get('/', (req, res) => {
  const query = 'SELECT * FROM recipes';
  connection.query(query, (err, results) => {
    if (err) return sendErrorResponse(res, 'Error retrieving recipes');
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT recipes.*, GROUP_CONCAT(recipe_images.image_url) AS images
    FROM recipes
    LEFT JOIN recipe_images ON recipes.id = recipe_images.recipe_id
    WHERE recipes.id = ?
    GROUP BY recipes.id
  `;
  connection.query(query, [id], (err, results) => {
    if (err) return sendErrorResponse(res, 'Error retrieving recipe');
    if (results.length === 0) return sendErrorResponse(res, 'Recipe not found', 404);

    const recipe = results[0];
    try {
      recipe.ingredientQuantities = JSON.parse(recipe.ingredientQuantities); // Parse JSON
      recipe.instructions = JSON.parse(recipe.instructions); // Parse instructions as JSON
    } catch (e) {
      return sendErrorResponse(res, 'Error parsing ingredient quantities or instructions', 500);
    }
    recipe.images = recipe.images ? recipe.images.split(',') : []; // Parse images
    res.json(recipe);
  });
});

module.exports = router;
