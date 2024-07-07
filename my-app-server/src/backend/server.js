const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'recipes_db'
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Rota para obter todas as receitas
app.get('/recipes', (req, res) => {
  const query = 'SELECT * FROM recipes';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Importar rotas de autenticação
require('./auth')(app, connection);

// Importar e usar as rotas de receitas
const recipeRoutes = require('./recipes');
app.use('/recipes', recipeRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
