const express = require('express');
const authController = require('../controllers/authController'); // Import the controller

const router = express.Router();

router.post('/signup', authController.signup); // Route for signup
router.post('/login', authController.login);   // Route for login

module.exports = router;

