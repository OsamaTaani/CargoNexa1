// driverModel.js
const { pool } = require('../db');
const bcrypt = require('bcrypt');

const createDriver = async (driver_username, driver_email, driver_password, driver_license,
  truck_type, production_year, plate_number, truck_image, driver_size_type) => {
  
  const role_id = 2;
  const hashedPassword = await bcrypt.hash(driver_password, 10); // Hash the password before storing

  const query = `
    INSERT INTO drivers (driver_username, driver_email, driver_password, driver_license,
      truck_type, production_year, plate_number, truck_image, driver_size_type , role_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )  
    RETURNING *;
  `;

  const result = await pool.query(query, [driver_username, driver_email, hashedPassword, driver_license,
    truck_type, production_year, plate_number, truck_image, driver_size_type , role_id]);

  return result.rows[0];
};

const getDriverByEmail = async (email) => {
    const query = 'SELECT * FROM drivers WHERE driver_email = $1';
    const result = await pool.query(query, [email]);
    console.log('Query Result:', result.rows);
  
    return result.rows[0];
  };
  
  const verifyDriverCredentials = async (email, password) => {
    const driver = await getUserByEmail(email);
  
    if (!driver) {
      return null; // User not found
    }
  
    const passwordMatch = await bcrypt.compare(password, driver.driver_password);
    return passwordMatch ? driver : null;
  };

//   const verifyDriverCredentials = async (email, password) => {
//     const driver = await getDriverByEmail(email);
  
//     if (!driver) {
//       console.log('Driver not found');
//       return null; // Driver not found
//     }
  
//     console.log('Stored hashed password in the database:', driver.driver_password);
    
//     const passwordMatch = await bcrypt.compare(password, driver.driver_password);
//     console.log('Password provided in the login attempt:', password);
//     console.log('Password match:', passwordMatch);
  
//     return passwordMatch ? driver : null;
//   };
    
  

module.exports = { createDriver, getDriverByEmail , verifyDriverCredentials };
