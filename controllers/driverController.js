// driverController.js
const DriverModel = require('../models/driverModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const registerDriver = async (req, res) => {
  const validationSchema = Joi.object({
    driver_username: Joi.string().required(),
    driver_email: Joi.string().email().required(),
    driver_password: Joi.string().required(),
    driver_license: Joi.number().integer().required(),
    truck_type: Joi.string().required(),
    production_year: Joi.number().integer().required(),
    plate_number: Joi.number().integer().required(),
    truck_image: Joi.string().required(),
    driver_size_type: Joi.string().required(),
    // status: Joi.string().required(), //might use in future 
  });

  const { error } = validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    driver_username, driver_email, driver_password, driver_license,
    truck_type, production_year, plate_number, truck_image, driver_size_type,
  } = req.body;

  try {
    const existingDriver = await DriverModel.getDriverByEmail(driver_email);
    if (existingDriver) {
      return res.status(409).json({ error: 'Email is already registered for a driver' });
    }

    const newDriver = await DriverModel.createDriver(driver_username, driver_email, driver_password, driver_license,
      truck_type, production_year, plate_number, truck_image, driver_size_type )
    // const hashedPassword = await bcrypt.hash(driver_password, 10);
    // const newDriver = await DriverModel.createDriver(
    //   driver_username, driver_email, hashedPassword, driver_license,
    //   truck_type, production_year, plate_number, truck_image, driver_size_type, status,
    // );

    const token = jwt.sign(
      { driverId: newDriver.driver_id, email: newDriver.driver_email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ driver: newDriver, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginDriver = async (req, res) => {
    const validationSchema = Joi.object({
      driver_email: Joi.string().email().required(),
      driver_password: Joi.string().required(),
    });
  
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    const { driver_email, driver_password } = req.body;
  
    try {
      console.log('Login attempt:', driver_email);
  
      const driver = await (driver_email, driver_password);
      console.log('Driver found:', driver);
  
      if (!driver) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { driverId: driver.driver_id, email: driver.driver_email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ message: 'Login successful', driver, token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { registerDriver, loginDriver };
