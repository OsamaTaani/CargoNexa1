const {pool} = require('../db');


const getAllUsers = async () => {
  const users = await pool.query('SELECT * FROM users WHERE isDeleted = false');
  return users.rows;
};

const getUserById = async (userId) => {
  const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return user.rows[0];
};

const updateUserById = async (userId, username, password, email, phoneNumber) => {
  const updatedUser = await pool.query(
    'UPDATE users SET user_username = $1, user_password = $2, user_email = $3, user_phone_number = $4 WHERE user_id = $5 RETURNING *',
    [username, password, email, phoneNumber, userId]
  );

  return updatedUser.rows[0];
};

const deleteUserById = async (userId) => {
  const deletedUser = await pool.query('UPDATE users SET isDeleted = true WHERE user_id = $1  RETURNING *', [userId]);
  return deletedUser.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
