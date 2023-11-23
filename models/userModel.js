// userModel.js
const { pool } = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (username, password, email, phoneNumber) => {
  const role_id = 1;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing

  const query = 'INSERT INTO users (user_username, user_password, user_email, user_phone_number, role_id) VALUES ($1, $2, $3, $4,$5) RETURNING *';
  const result = await pool.query(query, [username, hashedPassword, email, phoneNumber , role_id]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE user_email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const verifyCredentials = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return null; // User not found
  }

  const passwordMatch = await bcrypt.compare(password, user.user_password);
  return passwordMatch ? user : null;
};

module.exports = { createUser, getUserByEmail, verifyCredentials };
