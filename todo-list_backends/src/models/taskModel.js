const db = require('../config/dbconfig');

const Task = {
  create: (title, description, callback) => {
    const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
    db.query(sql, [title, description, 'pending'], callback);
  },

  update: (id, title, description, status, callback) => {
    const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    db.query(sql, [title, description, status, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], callback);
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, callback);
  },
};

module.exports = Task;
