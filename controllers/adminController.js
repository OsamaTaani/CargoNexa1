// adminController.js
const AdminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config(); // Load environment variables from .env

const loginAdmin = async (req, res) => {
  // Validation check
  const validationSchema = Joi.object({
    admin_email: Joi.string().email().required(),
    admin_password: Joi.string().required(),
  });

  const { error } = validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { admin_email, admin_password } = req.body;

  try {
    // Verify admin credentials
    const admin = await AdminModel.verifyCredentials(admin_email, admin_password);
    // console.log(admin);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ admin_id: admin.admin_id, admin_email: admin.admin_email, role_id: admin.role_id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    console.log(token);
    res.status(200).json({ message: 'Admin login successful', admin, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Create a new admin
// const registerAdmin = async (req, res) => {
//   // Validation check
//   const validationSchema = Joi.object({
//     admin_username: Joi.string().required(),
//     admin_password: Joi.string().required(),
//     admin_email: Joi.string().email().required(),
//     admin_phone_number: Joi.string().required(),
//   });

//   const { error } = validationSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   const { admin_username, admin_password, admin_email, admin_phone_number } = req.body;

//   try {
//     // Check if the email is already taken
//     const existingAdmin = await AdminModel.getAdminByEmail(admin_email);
//     if (existingAdmin) {
//       return res.status(409).json({ error: 'Email is already registered' });
//     }

//     // Create a new admin
//     const newAdmin = await AdminModel.createAdmin(admin_username, admin_password, admin_email, admin_phone_number);

//     // Generate JWT token
//     const token = jwt.sign({ adminId: newAdmin.admin_id, adminEmail: newAdmin.admin_email, roleId: newAdmin.role_id }, process.env.SECRET_KEY, { expiresIn: '1h' });

//     res.status(201).json({ admin: newAdmin, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.getAllAdmins();
    res.status(200).json({ admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  const adminId = req.params.adminId;

  try {
    const admin = await AdminModel.getAdminById(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update admin by ID
const updateAdminById = async (req, res) => {
  const adminId = req.params.adminId;
  const { admin_username, admin_email, admin_phone_number , admin_password} = req.body;

  try {
    const updatedAdmin = await AdminModel.updateAdminById(adminId, admin_username, admin_email, admin_phone_number , admin_password);

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ admin: updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//soft delete
const deleteAdminById = async (req, res) => {
  const adminId = req.params.adminId;

  try {
    const deletedAdmin = await AdminModel.deleteAdminById(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin soft deleted successfully', admin: deletedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// // Delete admin by ID
// const deleteAdminById = async (req, res) => {
//   const adminId = req.params.adminId;

//   try {
//     const deletedAdmin = await AdminModel.deleteAdminById(adminId);

//     if (!deletedAdmin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     res.status(200).json({ message: 'Admin deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

module.exports = {
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};


