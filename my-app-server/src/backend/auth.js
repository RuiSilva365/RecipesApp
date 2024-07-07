const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret';

module.exports = function (app, connection) {
  // Rota de registro
  app.post('/auth/register', (req, res) => {
    const { email, password, role } = req.body;
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    connection.query(query, [email, password, role], (err, results) => {
      if (err) return res.status(500).send(err);
      const token = jwt.sign({ userId: results.insertId, email, role }, secretKey, { expiresIn: '1h' });
      res.status(201).json({ token });
    });
  });

  // Rota de login
  app.post('/auth/login', (req, res) => {
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

  // Middleware para proteger rotas de administrador
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

  module.exports.authenticateAdmin = authenticateAdmin;
};
