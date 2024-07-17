const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'https://clever-arriving-turkey.ngrok-free.app',
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

module.exports = connection;
