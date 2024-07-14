const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const connection = require('./db'); // Assumindo que você tem um arquivo db.js que exporta a conexão do banco de dados

// Importar rotas de autenticação
require('./auth')(app, connection);

// Importar e usar as rotas de receitas
const recipeRoutes = require('./recipes');
app.use('/recipes', recipeRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
