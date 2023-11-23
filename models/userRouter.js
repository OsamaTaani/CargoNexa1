// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Import the middleware

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Protected route example
// router.get('/profile', authenticateToken, (req, res) => {
//   // Access user information from req.user
//   res.json({ message: 'Profile accessed successfully', user: req.user });
// });

module.exports = router;
