import express from 'express';
import * as path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import telegramBotController from './controllers/telegramBotController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON data from POST requests
app.use(express.json());

// Route to handle form submissions
app.post('/send-message', telegramBotController.sendTelegramMessage);

app.use(express.static(path.join(__dirname, '../build')));

app.use('/api/users', userRoutes);
app.use('/api/shipments', shipmentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
