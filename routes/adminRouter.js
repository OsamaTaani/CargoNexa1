// routes/adminAuthRouter.js
const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');



// Create a new admin
// router.post('/', adminController.registerAdmin);

// Admin login
router.post('/login', adminAuthController.loginAdmin);

// Get all admins
router.get('/',authMiddleware.authorize([2]), adminAuthController.getAllAdmins);

// Get admin by ID
router.get('/:adminId', authMiddleware.authorize([2]), adminAuthController.getAdminById);

// Update admin by ID
router.put('/update/:adminId', authMiddleware.authorize([2]), adminAuthController.updateAdminById);

// Delete admin by ID
router.put('/softDelete/:adminId', authMiddleware.authorize([2]), adminAuthController.deleteAdminById);

module.exports = router;


