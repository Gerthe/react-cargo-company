import db from '../config/db.js';

const logModel = {
  log: async ({ shipmentId, adminId, prevStatus, newStatus }) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.execute(
        'INSERT INTO logs (shipment_id, admin_id, previous_status, new_status) VALUES (?, ?, ?, ?)',
        [shipmentId, adminId, prevStatus, newStatus]
      );
      return results.insertId;
    } catch (err) {
      throw new Error('Error inserting log: ' + err.message);
    }
  },
  getLogsByShipmentId: async (shipmentId) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM logs WHERE shipment_id = ?',
        [shipmentId]
      );
      return results;
    } catch (err) {
      throw new Error('Error getting logs: ' + err.message);
    }
  },
  getAllLogs: async () => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query('SELECT * FROM logs');
      return results;
    } catch (err) {
      throw new Error('Error getting logs: ' + err.message);
    }
  },
};

export default logModel;
