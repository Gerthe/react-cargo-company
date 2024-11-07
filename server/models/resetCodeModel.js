import db from '../db.js';

const resetCodeModel = {
  add: async (phone, code, expirationTime) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
        'INSERT INTO reset_codes (phone, code, expirationTime) VALUES (?, ?, ?)',
        [phone, code, expirationTime]
      );
      return results;
    } catch (err) {
      throw new Error('Error inserting reset code: ' + err.message);
    }
  },
  check: async (phone, code) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
        'SELECT * FROM reset_codes WHERE phone = ? AND code = ?',
        [phone, code]
      );
      return results;
    } catch (err) {
      throw new Error('Error checking reset code: ' + err.message);
    }
  },
  delete: async (phone) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
        'DELETE FROM reset_codes WHERE phone = ?',
        [phone]
      );
      return results;
    } catch (err) {
      throw new Error('Error deleting reset code: ' + err.message);
    }
  },
  get: async (phone) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
        'SELECT * FROM reset_codes WHERE phone = ?',
        [phone]
      );
      return results;
    } catch (err) {
      throw new Error('Error checking reset code: ' + err.message);
    }
  },
};

export default resetCodeModel;
