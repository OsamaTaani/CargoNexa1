// services/orderService.js
const { pool } = require('../db');

const createOrder = async (userId, orderData) => {
    const {
        name,
        receiver_name,
        shipping_location,
        receiver_location,
        reciving_timestamp,
        shipping_timestamp,
        order_truck_size,
        order_description,
        status
    } = orderData;

    const newOrder = await pool.query(
        'INSERT INTO orders (user_id, name, receiver_name, shipping_location, receiver_location, reciving_timestamp, shipping_timestamp, order_truck_size, order_description, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [userId, name, receiver_name, shipping_location, receiver_location, reciving_timestamp, shipping_timestamp, order_truck_size, order_description, status]
    );

    return newOrder.rows[0];
};

module.exports = {
    createOrder,
};
