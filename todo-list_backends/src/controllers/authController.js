const User = require('../models/userModel'); // Import the User model

exports.signup = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  User.create(email, password, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already exists.' });
      }
      console.error('Error inserting data into database:', err.message);
      return res.status(500).json({ message: 'Error signing up. Please try again later.' });
    }
    res.status(201).json({ message: 'User signed up successfully!' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  User.findByCredentials(email, password, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.message);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful.', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  });
};
