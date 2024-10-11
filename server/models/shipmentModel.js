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
  createShipment: async (userId, trackingCode, description) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'INSERT INTO shipments (userId, trackingCode, description, status) VALUES (?, ?, ?, ?)',
        [userId, trackingCode, description, SHIPMENT_STATUSES.CREATED]
      );
      return {
        id: results.insertId,
        trackingCode,
        description,
        status: SHIPMENT_STATUSES.CREATED,
      };
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
  getShipments: async (filters, pagination, sorting, searchValue) => {
    const connection = await db.getConnection();
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'DESC',
    } = pagination;
    const { status, trackingCode, description } = filters;

    // Validate sortBy and order to prevent SQL injection
    const sortableFields = [
      'id',
      'trackingCode',
      'createdAt',
      'updatedAt',
      'description',
      'clientName',
    ];
    const orderOptions = ['ASC', 'DESC'];

    const safeSortBy = sortableFields.includes(sortBy) ? sortBy : 'createdAt';
    const safeOrder = orderOptions.includes(order.toUpperCase())
      ? order.toUpperCase()
      : 'DESC';

    let query = `
    SELECT 
      shipments.id, 
      shipments.status,
      shipments.trackingCode, 
      shipments.createdAt, 
      shipments.updatedAt, 
      shipments.description, 
      users.phone AS userPhone
    FROM shipments
    JOIN users ON shipments.userId = users.id
    WHERE 1=1
  `;
    const values = [];

    // Apply filters
    if (status) {
      query += ' AND shipments.status = ?';
      values.push(status);
    }

    if (trackingCode) {
      query += ' AND shipments.trackingCode LIKE ?';
      values.push(`%${trackingCode}%`);
    }

    if (description) {
      query += ' AND shipments.description LIKE ?';
      values.push(`%${description}%`);
    }

    if (searchValue) {
      query += ' AND (shipments.trackingCode LIKE ? OR users.phone LIKE ?)';
      values.push(`%${searchValue}%`, `%${searchValue}%`);
    }

    // Apply sorting
    query += ` ORDER BY shipments.${safeSortBy} ${safeOrder}`;

    // Apply pagination
    query += ' LIMIT ? OFFSET ?';
    values.push(
      parseInt(limit, 10),
      (parseInt(page, 10) - 1) * parseInt(limit, 10)
    );

    // Execute the query
    const [results] = await connection.query(query, values);
    return results;
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
        'SELECT * FROM shipments WHERE status != ? AND userId = ? ORDER BY updatedAt DESC',
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
        'SELECT * FROM shipments WHERE status = ? AND userId = ? ORDER BY updatedAt DESC',
        [SHIPMENT_STATUSES.DELIVERED, userId]
      );

      return results;
    } catch (err) {
      throw new Error('Error getting inactive shipments: ' + err.message);
    }
  },
  deleteShipment: async (id) => {
    try {
      const connection = await db.getConnection();
      const [results] = await connection.query(
        'DELETE FROM shipments WHERE id = ?',
        [id]
      );

      return results;
    } catch (err) {
      throw new Error('Error deleting shipment: ' + err.message);
    }
  },
  getTotalCount: async (filters, searchValue) => {
    const connection = await db.getConnection();
    const { status, trackingCode, userPhone } = filters;

    let query = `
    SELECT COUNT(*) AS total 
    FROM shipments
    JOIN users ON shipments.userId = users.id
    WHERE 1=1
  `;
    const values = [];

    // Apply filters
    if (status) {
      query += ' AND shipments.status = ?';
      values.push(status);
    }

    if (trackingCode) {
      query += ' AND shipments.trackingCode LIKE ?';
      values.push(`%${trackingCode}%`);
    }

    if (userPhone) {
      query += ' AND users.phone LIKE ?';
      values.push(`%${userPhone}%`);
    }

    if (searchValue) {
      query += ' AND (shipments.trackingCode LIKE ? OR users.phone LIKE ?)';
      values.push(`%${searchValue}%`, `%${searchValue}%`);
    }

    // Execute the query
    const [results] = await connection.query(query, values);
    return results[0].total;
  },
};

export default shipmentModel;
