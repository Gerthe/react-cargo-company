import db from '../config/db.js';

const logModel = {
  log: async ({ shipmentId, adminId, prevStatus, newStatus }) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.execute(
        'INSERT INTO admin_logs (shipmentId, adminId, previousStatus, newStatus) VALUES (?, ?, ?, ?)',
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
        'SELECT * FROM admin_logs WHERE shipmentId = ?',
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
      const [results] = await connection.query('SELECT * FROM admin_logs');
      return results;
    } catch (err) {
      throw new Error('Error getting logs: ' + err.message);
    }
  },
};

export default logModel;
