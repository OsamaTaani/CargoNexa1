const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/dashboardOrdersController');

// CRUD operations for orders
router.get('/orders', authMiddleware.authorize([2]), orderController.getAllOrders);
router.get('/orders/:orderId', authMiddleware.authorize([2]), orderController.getOrderById);
router.put('/update-orders/:orderId', authMiddleware.authorize([2]), orderController.updateOrderById);
router.put('/delete-orders/:orderId', authMiddleware.authorize([2]), orderController.deleteOrderById);

module.exports = router;
