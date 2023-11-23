const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userProfileController');

router.get('/user-profile', authMiddleware.authorize([1]), userController.getUserProfile);
router.put('/update-user-profile', authMiddleware.authorize([1]), userController.updateUserProfile);
router.get('/user-orders', authMiddleware.authorize([1]), userController.getUserOrders);

module.exports = router;
