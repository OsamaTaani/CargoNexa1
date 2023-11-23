// driverRoutes.js
const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/driverController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', DriverController.registerDriver);
router.post('/login', DriverController.loginDriver);

// Protected route example
// router.get('/profile', authenticateToken, (req, res) => {
//   res.json({ message: 'Driver profile accessed successfully', driver: req.user });
// });

module.exports = router;
