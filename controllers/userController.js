// userController.js
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config(); // Load environment variables from .env

const registerUser = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
  });

  const { error } = validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, password, email, phoneNumber } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const newUser = await UserModel.createUser(username, password, email, phoneNumber);

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.user_id, email: newUser.user_email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    // Verify user credentials
    const user = await UserModel.verifyCredentials(email, password );
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id, email: user.user_email , role_id:user.role_id }, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser };
