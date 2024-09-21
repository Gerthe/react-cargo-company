import db from '../config/db.js';

const shipmentModel = {
  createShipment: async (userId, code, description) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'INSERT INTO shipments (user_id, tracking_code, description) VALUES (?, ?, ?)',
        [userId, code, description]
      );
      return { id: results.insertId, code };
    } catch (err) {
      throw new Error('Error inserting shipment: ' + err.message);
    }
  },
  getShipmentById: async (id) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM shipments WHERE id = ?',
        [id]
      );
      return results[0];
    } catch (err) {
      throw new Error('Error getting shipment: ' + err.message);
    }
  },
  getAllShipmentsByUserId: async (userId) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM shipments WHERE user_id = ?',
        [userId]
      );
      return results;
    } catch (err) {
      throw new Error('Error getting shipments: ' + err.message);
    }
  },
  getAllShipments: async () => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query('SELECT * FROM shipments');
      return results;
    } catch (err) {
      throw new Error('Error getting shipments: ' + err.message);
    }
  },
  updateShipmentStatus: async (id, status) => {
    try {
      const connection = await db.getConnection();
      const [results, fields] = await connection.query(
        'UPDATE shipments SET status = ? WHERE id = ?',
        [status, id]
      );
      console.log(results, fields);
      return results;
    } catch (err) {
      throw new Error('Error updating shipment status: ' + err.message);
    }
  },
};

export default shipmentModel;
