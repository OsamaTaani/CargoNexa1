const express = require('express');
const router = express.Router();
const userController = require('../controllers/dashboardUsersController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/all-users', authMiddleware.authorize([2]), userController.getAllUsers);
router.get('/users/:userId', authMiddleware.authorize([2]),userController.getUserById);
router.put('/update-users/:userId', authMiddleware.authorize([2]),userController.updateUserById);
router.put('/delete-users/:userId', authMiddleware.authorize([2]),userController.deleteUserById);

module.exports = router;
