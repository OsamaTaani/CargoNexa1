const UserModel = require('../models/dashboardUsersModel');
require('dotenv').config();


// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update User by ID
const updateUserById = async (req, res) => {
  const userId = req.params.userId;
  const { username, password, email, phoneNumber } = req.body;

  try {
    const updatedUser = await UserModel.updateUserById(userId, username, password, email, phoneNumber);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete User by ID
const deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await UserModel.deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User soft deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
