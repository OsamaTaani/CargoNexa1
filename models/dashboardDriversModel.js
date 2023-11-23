const {pool} = require('../db');

const getAllDrivers = async () => {
  const drivers = await pool.query('SELECT * FROM drivers');
  return drivers.rows;
};

const getDriverById = async (driverId) => {
  const driver = await pool.query('SELECT * FROM drivers WHERE driver_id = $1', [driverId]);
  return driver.rows[0];
};

const updateDriverById = async (driverId, driver_username, driver_email, driver_password, driver_license,
    truck_type, production_year, plate_number, truck_image, driver_size_type , status) => {
  const updatedDriver = await pool.query(
    'UPDATE drivers SET driver_username = $1, driver_email = $2, driver_password = $3, driver_license = $4, truck_type = $5, production_year = $6, plate_number = $7, truck_image = $8, driver_size_type = $9, status = $10 WHERE driver_id = $11  RETURNING *',
    [driver_username, driver_email, driver_password, driver_license,
        truck_type, production_year, plate_number, truck_image, driver_size_type , status, driverId]
  );

  return updatedDriver.rows[0];
};

const deleteDriverById = async (driverId) => {
  const deletedDriver = await pool.query('UPDATE drivers SET isDeleted = true WHERE driver_id = $1 AND isDeleted = false RETURNING *', [driverId]);
  return deletedDriver.rows[0];
};

module.exports = {
  getAllDrivers,
  getDriverById,
  updateDriverById,
  deleteDriverById,
};
