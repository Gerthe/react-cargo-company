import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const env = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  DB_NAME: process.env.DB_NAME || 'my_database',
  PORT: process.env.PORT || 5000,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  SMSC_APIKEY: process.env.SMSC_APIKEY || 'your_smsc_apikey',
};

if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
  throw new Error(
    'Please provide both TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the .env file.'
  );
}

export default env;
