const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./auth').router;
const recipeRoutes = require('./recipes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', recipeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
