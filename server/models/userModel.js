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
  getUserById: (id) =>
    new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    }),
  getAllUsers: () =>
    new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    }),
};

export default userModel;
