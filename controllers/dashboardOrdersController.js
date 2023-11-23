const OrderModel = require('../models/dashboardOrdersModel');


// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.getAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Order by ID
const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await OrderModel.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update Order by ID
const updateOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  const { name, receiver_name, shipping_location, receiver_location, shipping_timestamp, order_truck_size, order_description, status } = req.body;

  try {
    const updatedOrder = await OrderModel.updateOrderById(orderId, name, receiver_name, shipping_location, receiver_location, shipping_timestamp, order_truck_size, order_description, status);

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete Order by ID
const deleteOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await OrderModel.deleteOrderById(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order soft deleted successfully', order: deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
