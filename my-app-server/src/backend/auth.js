const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret';

module.exports = function (app, connection) {
  // Register route
  app.post('/auth/register', (req, res) => {
    const { email, password, role } = req.body;
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    connection.query(query, [email, password, role], (err, results) => {
      if (err) return res.status(500).send(err);
      const token = jwt.sign({ userId: results.insertId, email, role }, secretKey, { expiresIn: '1h' });
      res.status(201).json({ token });
    });
  });

  // Login route
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

  // Get profile route
  app.get('/api/profile', (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).send('Invalid Token');
      const query = 'SELECT * FROM users WHERE id = ?';
      connection.query(query, [user.userId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        const userProfile = {
          name: results[0].name || 'User Name',
          email: results[0].email,
          avatarUrl : results[0].profile_image, //role === 'admin' ? 'assets/icon/admin_icon.png' : 'assets/icon/user_icon.png',
          bio: results[0].bio
        };
        res.status(200).json(userProfile);
      });
    });
  });

  // Middleware for admin routes
  const authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
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
