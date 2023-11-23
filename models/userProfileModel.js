const {pool} = require('../db');

const getUserById = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const updateUserProfile = async (userId, updatedInfo) => {
    try {
      const { user_username, user_email, user_phone_number } = updatedInfo;
  
      const result = await pool.query(
        'UPDATE users SET user_username = $1, user_email = $2, user_phone_number = $3, WHERE user_id = $4 RETURNING *',
        [user_username, user_email, user_phone_number, userId]
      );
  
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  module.exports = {  updateUserProfile , getUserById };
  