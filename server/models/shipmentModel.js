import db from '../config/db';

const createShipment = (userId, code, description) =>
  new Promise((resolve, reject) => {
    const query =
      'INSERT INTO shipments (user_id, tracking_code, description) VALUES (?, ?, ?)';

    db.query(query, [userId, code, description], (err, results) => {
      if (err) {
        reject(err);
      } else resolve({ id: results.insertId, code });
    });
  });

const getShipmentById = (id) =>
  new Promise((resolve, reject) => {
    const query = 'SELECT * FROM shipments WHERE id = ?';

    db.query(query, [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });

const getAllShipmentsByUserId = (userId) =>
  new Promise((resolve, reject) => {
    const query = 'SELECT * FROM shipments WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

const getAllShipments = () =>
  new Promise((resolve, reject) => {
    const query = 'SELECT * FROM shipments';
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

export const shipmentModel = {
  createShipment,
  getShipmentById,
  getAllShipmentsByUserId,
  getAllShipments,
};
