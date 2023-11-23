// models/adminModel.js

const {pool} = require('../db');


const getAdminByEmail = async (admin_email) => {
    const admin = await pool.query(
        'SELECT * FROM admins WHERE admin_email = $1',
        [admin_email]
    );

    return admin.rows[0];
};

const verifyCredentials = async(admin_email , admin_password) => {
    const admin = await getAdminByEmail(admin_email);

    if(admin && await admin_password, admin.admin_password) {
        return admin
    };
    return null;
}
const getAllAdmins = async () => {
    const admins = await pool.query('SELECT * FROM admins');
    return admins.rows;
  };
  
  const getAdminById = async (adminId) => {
    const admin = await pool.query('SELECT * FROM admins WHERE admin_id = $1', [adminId]);
    return admin.rows[0];
  };
  
  const updateAdminById = async (adminId, admin_username, admin_email, admin_phone_number , admin_password) => {
    const updatedAdmin = await pool.query(
      'UPDATE admins SET admin_username = $1, admin_email = $2, admin_phone_number = $3 , admin_password = $4 WHERE admin_id = $5 RETURNING *',
      [admin_username, admin_email, admin_phone_number, admin_password, adminId ]
    );
  
    return updatedAdmin.rows[0];
  };
//Soft delete
  const deleteAdminById = async (adminId) => {
    const deletedAdmin = await pool.query(
      'UPDATE admins SET isDeleted = true WHERE admin_id = $1 RETURNING *',
      [adminId]
    );
  
    return deletedAdmin.rows[0];
  };

  //delete 
  // const deleteAdminById = async (adminId) => {
  //   const deletedAdmin = await pool.query('DELETE FROM admins WHERE admin_id = $1 RETURNING *', [adminId]);
  //   return deletedAdmin.rows[0];
  // };
  
  module.exports = {
    getAdminByEmail,
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById,
    verifyCredentials
  };
  


