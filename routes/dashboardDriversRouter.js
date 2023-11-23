const express = require('express');
const router = express.Router();
const driverController = require('../controllers/dashboardDriversController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/drivers', authMiddleware.authorize([2]), driverController.getAllDrivers);
router.get('/drivers/:driverId', authMiddleware.authorize([2]) ,driverController.getDriverById);
router.put('/update-drivers/:driverId', authMiddleware.authorize([2]) ,driverController.updateDriverById);
router.put('/delete-drivers/:driverId', authMiddleware.authorize([2]) , driverController.deleteDriverById);

module.exports = router;
