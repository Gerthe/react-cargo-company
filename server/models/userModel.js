import db from '../db.js';

const userModel = {
  createUser: async (phone, password, name) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
        'INSERT INTO users (phone, password, name) VALUES (?, ?, ?)',
        [phone, password, name]
      );
      return { id: results.insertId, phone, name };
    } catch (err) {
      throw new Error('Error inserting user: ' + err.message);
    }
  },
  updateUser: async (id, data) => {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('No fields to update');
      }

      const pool = db.getPool();

      const updateFields = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(', ');
      const values = Object.values(data);

      await pool.query(`UPDATE shipments SET ${updateFields} WHERE id = ?`, [
        ...values,
        id,
      ]);

      const [results] = await pool.query(
        `UPDATE users SET ${updateFields} WHERE id = ?`,
        [...values, id]
      );
      return results.affectedRows > 0;
    } catch (err) {
      throw new Error('Error updating user: ' + err.message);
    }
  },
  getUserById: async (id) => {
    try {
      const pool = db.getPool();
      const publicColumns = ['id', 'phone', 'role', 'name', 'location'];
      const [results] = await pool.query(
        `SELECT ${publicColumns.join(', ')} FROM users WHERE id = ?`,
        [id]
      );
      return results[0];
    } catch (err) {
      throw new Error('Error getting user: ' + err.message);
    }
  },
  getAll: async (filters, pagination, sorting, searchValue) => {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'DESC',
    } = pagination;

    // Validate sortBy and order to prevent SQL injection
    const sortableFields = ['id', 'updatedAt'];
    const orderOptions = ['ASC', 'DESC'];

    const safeSortBy = sortableFields.includes(sortBy) ? sortBy : 'createdAt';
    const safeOrder = orderOptions.includes(order.toUpperCase())
      ? order.toUpperCase()
      : 'DESC';

    let query;
    query = `
        SELECT
        users.*,
        COUNT(shipments.id) as shipmentsCount
        FROM users
        LEFT JOIN shipments ON users.id = shipments.userId
        GROUP BY users.id
      `;

    const values = [];

    if (searchValue) {
      query += ' AND (users.phone LIKE ?)';
      values.push(`%${searchValue}%`);
    }

    // Apply sorting
    query += ` ORDER BY users.${safeSortBy} ${safeOrder}`;

    // Apply pagination
    query += ' LIMIT ? OFFSET ?';
    values.push(
      parseInt(limit, 10),
      (parseInt(page, 10) - 1) * parseInt(limit, 10)
    );

    try {
      const pool = db.getPool();
      const [results] = await pool.query(query, values);

      return results;
    } catch (err) {
      throw new Error('Error getting users: ' + err.message);
    }
  },
  getUserByPhone: async (phone) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
        'SELECT * FROM users WHERE phone = ?',
        [phone]
      );
      return results[0];
    } catch (err) {
      throw new Error('Error getting user: ' + err.message);
    }
  },
  getTotalCount: async (filters, searchValue) => {
    let query = 'SELECT COUNT(*) as count FROM users';
    const values = [];

    if (searchValue) {
      query += ' WHERE (phone LIKE ?)';
      values.push(`%${searchValue}%`);
    }

    try {
      const pool = db.getPool();
      const [results] = await pool.query(query, values);
      return results[0].count;
    } catch (err) {
      throw new Error('Error getting total count: ' + err.message);
    }
  },
  updatePassword: async (phone, password) => {
    try {
      const pool = db.getPool();
      const [result] = await pool.query(
        'UPDATE users SET password = ? WHERE phone = ?',
        [password, phone]
      );
      return result.affectedRows > 0;
    } catch (err) {
      throw new Error('Error updating password: ' + err.message);
    }
  },
};

export default userModel;
