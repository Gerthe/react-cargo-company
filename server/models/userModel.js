import db from '../config/db.js';

const userModel = {
  createUser: async (phone, password) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'INSERT INTO users (phone, password) VALUES (?, ?)',
        [phone, password]
      );
      return { id: results.insertId, phone };
    } catch (err) {
      throw new Error('Error inserting user: ' + err.message);
    }
  },
  getUserById: async (id) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return results[0];
    } catch (err) {
      throw new Error('Error getting user: ' + err.message);
    }
  },
  getAllUsers: async () => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM users WHERE role = "user"'
      );
      return results;
    } catch (err) {
      throw new Error('Error getting users: ' + err.message);
    }
  },
};

export default userModel;
