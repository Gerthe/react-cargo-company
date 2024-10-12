import db from '../config/db.js';

const userModel = {
  createUser: async (phone, password, name) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'INSERT INTO users (phone, password, name) VALUES (?, ?, ?)',
        [phone, password, name]
      );
      return { id: results.insertId, phone, name };
    } catch (err) {
      throw new Error('Error inserting user: ' + err.message);
    }
  },
  getUserById: async (id) => {
    try {
      const connection = await db.getConnection();
      const publicColumns = ['id', 'phone', 'role'];
      const [results] = await connection.query(
        `SELECT ${publicColumns.join(', ')} FROM users WHERE id = ?`,
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
      const query = `
        SELECT
        users.*,
        COUNT(shipments.id) as shipmentsCount
        FROM users
        LEFT JOIN shipments ON users.id = shipments.userId
        WHERE role = "user"
        GROUP BY users.id
      `;

      const [results] = await connection.query(query);
      return results;
    } catch (err) {
      throw new Error('Error getting users: ' + err.message);
    }
  },
  getUserByPhone: async (phone) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM users WHERE phone = ?',
        [phone]
      );
      return results[0];
    } catch (err) {
      throw new Error('Error getting user: ' + err.message);
    }
  },
};

export default userModel;
