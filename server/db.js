import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import env from './config/envConfig.js';

dotenv.config();

let pool;

const db = {
  createPool: () => {
    if (!pool) {
      pool = mysql.createPool({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log('MySQL pool created.');
    } else {
      console.log('MySQL pool already exists.');
    }
  },

  getPool: () => {
    if (!pool) {
      throw new Error('Pool was not created. Call createPool() first.');
    }
    return pool;
  },

  endPool: async () => {
    if (pool) {
      await pool.end();
      pool = null; // Reset pool after ending it
      console.log('MySQL pool ended.');
    } else {
      console.log('No pool to end.');
    }
  },
};

db.createPool();

export default db;
