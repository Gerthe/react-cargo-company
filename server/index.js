// server/index.js
import express from 'express';
import bodyParser from "body-parser";
import fetch from "node-fetch";
import * as path from "path";
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON data from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Telegram Bot API details (use environment variables in a production environment)
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// Route to handle form submissions
app.post('/send-message', async (req, res) => {
  const {name, phone, message} = req.body;
  const text = `Имя: ${name}
  Телефон: ${phone}
  Сообщение: ${message}`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok) {
      res.status(200).json({message: 'Message sent successfully!'});
    } else {
      res.status(500).json({error: 'Error sending message.'});
    }
  } catch (error) {
    res.status(500).json({error: 'Error connecting to Telegram.'});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});