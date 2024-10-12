import db from '../db.js';

const logModel = {
  log: async ({ shipmentId, adminId, prevStatus, newStatus }) => {
    try {
      const pool = db.getPool();
      const [results] = await pool.query(
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
      const pool = db.getPool();
      const [results] = await pool.query(
        'SELECT * FROM admin_logs WHERE shipmentId = ?',
        [shipmentId]
      );
      return results;
    } catch (err) {
      throw new Error('Error getting logs: ' + err.message);
    }
  },
  getLogs: async (pagination, sorting, searchValue) => {
    const {
      page = 1,
      limit = 10,
      sortBy = 'changedAt',
      order = 'DESC',
    } = pagination;

    const sortableFields = ['id', 'shipmentId', 'adminId', 'changedAt'];

    const orderOptions = ['ASC', 'DESC'];

    const safeSortBy = sortableFields.includes(sortBy) ? sortBy : 'changedAt';
    const safeOrder = orderOptions.includes(order.toUpperCase())
      ? order.toUpperCase()
      : 'DESC';

    let query = `
      SELECT
        admin_logs.id,
        admin_logs.shipmentId,
        admin_logs.adminId,
        admin_logs.changedAt,
        admin_logs.previousStatus,
        admin_logs.newStatus,
        shipments.trackingCode AS trackingCode
      FROM admin_logs
      JOIN shipments ON admin_logs.shipmentId = shipments.id
      WHERE 1=1
    `;

    const values = [];

    if (searchValue) {
      query += 'AND shipments.trackingCode LIKE ? ';
      values.push(`%${searchValue}%`);
    }

    query += ` ORDER BY admin_logs.${safeSortBy} ${safeOrder}`;
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
      throw new Error('Error getting logs: ' + err.message);
    }
  },
  getTotalCount: async (searchValue) => {
    let query = `
    SELECT COUNT(*) AS total 
    FROM admin_logs
    JOIN shipments ON admin_logs.shipmentId = shipments.id
    WHERE 1=1
  `;
    const values = [];

    if (searchValue) {
      query += 'AND shipments.trackingCode LIKE ? ';
      values.push(`%${searchValue}%`);
    }

    try {
      const pool = db.getPool();
      const [results] = await pool.query(query, values);
      return results[0].total;
    } catch (err) {
      throw new Error('Error getting total count: ' + err.message);
    }
  },
};

export default logModel;
