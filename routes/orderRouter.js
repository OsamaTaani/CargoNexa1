const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for creating a new order
router.post('/create', authMiddleware.authorize([1]), orderController.createOrder);

module.exports = router;
