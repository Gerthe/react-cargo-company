import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

const db = {
  getConnection: async () => {
    if (!pool) {
      try {
        pool = await mysql.createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });

        console.log('Successfully connected to the MySQL database.');
      } catch (error) {
        console.error('Error connecting to the MySQL database:', error);
        throw error;
      }
    }

    try {
      const connection = await pool.getConnection();
      console.log('Successfully got a connection from the pool.');
      return connection;
    } catch (error) {
      console.error('Error getting a connection from the pool:', error);
      throw error;
    }
  },
};

export default db;
