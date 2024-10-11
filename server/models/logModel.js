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
  getLogs: async (pagination, sorting, searchValue) => {
    const connection = await db.getConnection();
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
    console.log(Object.keys(searchValue));

    query += ` ORDER BY admin_logs.${safeSortBy} ${safeOrder}`;
    query += ' LIMIT ? OFFSET ?';
    values.push(
      parseInt(limit, 10),
      (parseInt(page, 10) - 1) * parseInt(limit, 10)
    );

    console.log('query', query);
    console.log('values', values);

    const [results] = await connection.query(query, values);

    return results;
  },
  getTotalCount: async (searchValue) => {
    const connection = await db.getConnection();

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

    // Execute the query
    const [results] = await connection.query(query, values);
    return results[0].total;
  },
};

export default logModel;
