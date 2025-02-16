const Task = require('../models/taskModel');

// Create a new task
exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  Task.create(title, description, (err, result) => {
    if (err) {
      console.error('Error creating task:', err.message);
      return res.status(500).json({ message: 'Error creating task.' });
    }
    res.status(200).json({ message: 'Task created successfully!' });
  });
};

// Update an existing task
exports.updateTask = (req, res) => {
  const { id, title, description, status } = req.body;

  if (!id || !title || !description || !status) {
    return res.status(400).json({ message: 'ID, title, description, and status are required.' });
  }

  Task.update(id, title, description, status, (err, result) => {
    if (err) {
      console.error('Error updating task:', err.message);
      return res.status(500).json({ message: 'Error updating task.' });
    }
    res.status(200).json({ message: 'Task updated successfully!' });
  });
};

// Delete a task
exports.deleteTask = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Task ID is required.' });
  }

  Task.delete(id, (err, result) => {
    if (err) {
      console.error('Error deleting task:', err.message);
      return res.status(500).json({ message: 'Error deleting task.' });
    }
    res.status(200).json({ message: 'Task deleted successfully!' });
  });
};

// Get all tasks
exports.getAllTasks = (req, res) => {
  Task.getAll((err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err.message);
      return res.status(500).json({ message: 'Error fetching tasks.' });
    }
    res.status(200).json(results);
  });
};
