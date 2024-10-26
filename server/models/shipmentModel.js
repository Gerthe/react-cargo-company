import db from '../db.js';

const SHIPMENT_STATUSES = {
  CREATED: 'created',
  CHINA_WAREHOUSE: 'china_warehouse',
  CHINA_WAREHOUSE_SENT: 'china_warehouse_sent',
  TRANSIT: 'transit',
  ALMATY_WAREHOUSE: 'almaty_warehouse',
  DELIVERED: 'delivered',
};

const shipmentModel = {
  statuses: SHIPMENT_STATUSES,
  createShipment: async ({
    trackingCode,
    description,
    arrivalDate = null,
    adminNote = null,
    claimed = 0,
    deliverTo = null,
    userId = null,
    status = SHIPMENT_STATUSES.CREATED,
    createdBy,
  }) => {
    try {
      const pool = db.getPool();

      const [results] = await pool.query(
        `INSERT INTO shipments 
          (trackingCode, description, arrivalDate, adminNote, claimed, deliverTo, userId, status, createdBy)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          trackingCode,
          description,
          arrivalDate,
          adminNote,
          claimed,
          deliverTo,
          userId,
          status,
          createdBy,
        ]
      );

      return {
        id: results.insertId,
        trackingCode,
        description,
        arrivalDate,
        adminNote,
        claimed,
        deliverTo,
        userId,
        status,
        createdBy,
      };
    } catch (err) {
      throw new Error('Error inserting shipment: ' + err.message);
    }
  },
  getShipmentById: async (id) => {
    try {
      const pool = db.getPool();
      const query = `
        SELECT
          shipments.*,
          users.phone AS userPhone,
          users.name AS userName,
          users.id AS userId
        FROM shipments
        LEFT JOIN users ON shipments.userId = users.id
        WHERE shipments.id = ?
    `;

      const [results] = await pool.query(query, [id]);
      return results[0];
    } catch (err) {
      throw new Error('Error getting shipment: ' + err.message);
    }
  },
  getShipments: async (filters, pagination, sorting, searchValue) => {
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
    ];
    const orderOptions = ['ASC', 'DESC'];

    const safeSortBy = sortableFields.includes(sortBy) ? sortBy : 'createdAt';
    const safeOrder = orderOptions.includes(order.toUpperCase())
      ? order.toUpperCase()
      : 'DESC';

    let query = `
    SELECT 
      shipments.*,
      users.phone AS userPhone,
      users.name AS userName,
      users.id AS userId
    FROM shipments
    LEFT JOIN users ON shipments.userId = users.id
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

    try {
      const pool = db.getPool();
      const [results] = await pool.query(query, values);

      return results;
    } catch (err) {
      throw new Error('Error getting shipments: ' + err.message);
    }
  },
  updateShipmentStatus: async (id, status) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
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
      const pool = db.getPool();
      const selectFields = `
        shipments.id,
        shipments.status,
        shipments.trackingCode,
        shipments.createdAt,
        shipments.deliverTo
      `;
      const [results] = await pool.query(
        `SELECT ${selectFields} FROM shipments WHERE status != ? AND userId = ? ORDER BY updatedAt DESC`,
        [SHIPMENT_STATUSES.DELIVERED, userId]
      );

      return results;
    } catch (err) {
      throw new Error('Error getting active shipments: ' + err.message);
    }
  },
  getUserInactiveShipments: async (userId) => {
    try {
      const pool = db.getPool();
      const selectFields = `
        shipments.id,
        shipments.status,
        shipments.trackingCode,
        shipments.createdAt,
        shipments.deliverTo
      `;
      const [results] = await pool.query(
        `SELECT ${selectFields} FROM shipments WHERE status = ? AND userId = ? ORDER BY updatedAt DESC`,
        [SHIPMENT_STATUSES.DELIVERED, userId]
      );

      return results;
    } catch (err) {
      throw new Error('Error getting inactive shipments: ' + err.message);
    }
  },
  deleteShipment: async (id) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query('DELETE FROM shipments WHERE id = ?', [
        id,
      ]);

      return results;
    } catch (err) {
      throw new Error('Error deleting shipment: ' + err.message);
    }
  },
  getTotalCount: async (filters, searchValue) => {
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
    try {
      const pool = db.getPool();
      // Execute the query
      const [results] = await pool.query(query, values);
      return results[0].total;
    } catch (err) {
      throw new Error('Error getting total count: ' + err.message);
    }
  },
  getShipmentByTrackingCode: async (trackingCode) => {
    try {
      const pool = db.getPool();
      const query = `
        SELECT * FROM shipments WHERE trackingCode = ?
    `;

      const [results] = await pool.query(query, [trackingCode]);

      return results[0];
    } catch (err) {
      throw new Error('Error getting shipment: ' + err.message);
    }
  },
  claim: async (id, userId) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
        'UPDATE shipments SET userId = ?, claimed = 1 WHERE id = ?',
        [userId, id]
      );

      console.log(results);

      return results;
    } catch (err) {
      throw new Error('Error claiming shipment: ' + err.message);
    }
  },
};

export default shipmentModel;
