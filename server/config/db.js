import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection;

const db = {
  getConnection: async () => {
    if (!connection) {
      try {
        connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });

        console.log('Successfully connected to the MySQL database.');
      } catch (error) {
        console.error('Error connecting to the MySQL database:', error);
        throw error;
      }
    }
    return connection;
  },
};

export default db;
