const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Routes for tasks
router.post('/create', taskController.createTask);
router.put('/update', taskController.updateTask);
router.delete('/delete', taskController.deleteTask);
router.get('/getAll', taskController.getAllTasks);

module.exports = router;
