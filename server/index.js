import express from 'express';
import * as path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import telegramBotController from './controllers/telegramBotController.js';
import logRoutes from './routes/logRoutes.js';
import env from './config/envConfig.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON data from POST requests
app.use(express.json());
app.use(
  cors({
    origin: env.BASE_URL, // Укажите здесь URL вашего фронтенда
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', // Allow required HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Include the required headers
    credentials: true,
  })
);

// Route to handle form submissions
app.post('/api/send-message', telegramBotController.sendTelegramMessage);

app.use(express.static(path.join(__dirname, '../build')));

app.use('/api/users', userRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/logs', logRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
