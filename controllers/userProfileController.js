const UserModel = require('../models/userProfileModel');



const getUserProfile = async (req, res) => {
  try {
    // Assuming you have the user ID available in the request (you can extract it from the JWT token)
    const userId = req.user.userId;

    // Retrieve user information from the database
    const userProfile = await UserModel.getUserById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user profile information in the response
    res.status(200).json({ userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.user_id;
      const updatedInfo = req.body;
  
      const updatedUser = await UserModel.updateUserProfile(userId, updatedInfo);
  
      res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getUserOrders = async (req, res) => {
    try {
      const userId = req.user.user_id;
  
      // Assuming you have a function in your model to retrieve user orders
      const userOrders = await OrderModel.getUserOrders(userId);
  
      res.status(200).json({ userOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { updateUserProfile, getUserOrders , getUserProfile };
  