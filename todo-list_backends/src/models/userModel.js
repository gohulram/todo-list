const db = require('../config/dbconfig');

const User = {
  create: (email, password, callback) => {
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], callback);
  },

  findByCredentials: (email, password, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], callback);
  },
};

module.exports = User;
