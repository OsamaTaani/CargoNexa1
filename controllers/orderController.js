// controllers/orderController.js
const orderService = require('../models/orderModel');

const createOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orderData = req.body;

        const newOrder = await orderService.createOrder(userId, orderData);

        res.status(201).json({ message: 'Order created successfully', data: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createOrder,
};
