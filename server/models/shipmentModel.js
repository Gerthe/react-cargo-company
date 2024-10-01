import db from '../config/db.js';

const SHIPMENT_STATUSES = {
  CREATED: 'created',
  CHINA_WAREHOUSE: 'china_warehouse',
  CHINA_WAREHOUSE_SENT: 'china_warehouse_sent',
  TRANSIT: 'transit',
  ALMATY_WAREHOUSE: 'almaty_warehouse',
  DELIVERED: 'delivered',
};

const shipmentModel = {
  createShipment: async (userId, code, description) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'INSERT INTO shipments (userId, trackingCode, description, status) VALUES (?, ?, ?)',
        [userId, code, description, SHIPMENT_STATUSES.CREATED]
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
  getShipments: async (filter) => {
    try {
      const connection = await db.getConnection();
      const filterString = filter
        ? Object.keys(filter)
            .map((key) => ` ${key} = ?`)
            .join(' AND ')
        : '';
      const filterValues = filter ? Object.values(filter) : [];

      const [results] = await connection.query(
        'SELECT * FROM shipments' +
          (filterString ? ' WHERE' + filterString : ''),
        [...filterValues]
      );

      return results;
    } catch (err) {
      throw new Error('Error getting shipments: ' + err.message);
    }
  },
  getAllShipments: async (filter) => {
    try {
      const connection = await db.getConnection();
      const filterString = filter
        ? Object.keys(filter)
            .map((key) => ` ${key} = ?`)
            .join(' AND ')
        : '';
      const filterValues = filter ? Object.values(filter) : [];
      const [results] = await connection.query(
        'SELECT * FROM shipments' + filterString,
        [filterValues]
      );
      return results;
    } catch (err) {
      throw new Error('Error getting shipments: ' + err.message);
    }
  },
  updateShipmentStatus: async (id, status) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'UPDATE shipments SET status = ? WHERE id = ?',
        [status, id]
      );

      return results;
    } catch (err) {
      throw new Error('Error updating shipment status: ' + err.message);
    }
  },
  getUserActiveShipments: async (userId) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM shipments WHERE status != ? AND userId = ?',
        [SHIPMENT_STATUSES.DELIVERED, userId]
      );
      //TODO canceled status

      return results;
    } catch (err) {
      throw new Error('Error getting active shipments: ' + err.message);
    }
  },
  getUserInactiveShipments: async (userId) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM shipments WHERE status = ? AND userId = ?',
        [SHIPMENT_STATUSES.DELIVERED, userId]
      );

      return results;
    } catch (err) {
      throw new Error('Error getting inactive shipments: ' + err.message);
    }
  },
};

export default shipmentModel;
