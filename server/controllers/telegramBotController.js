import fetch from 'node-fetch';
import env from '../config/envConfig.js';

const telegramBotController = {
  sendTelegramMessage: async (req, res) => {
    const { name, phone, message } = req.body;
    const text = `Имя: ${name}
Телефон: ${phone}
Сообщение: ${message || 'Без сообщения'}`;

    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.ok) {
        res.status(200).json({ message: 'Message sent successfully!' });
      } else {
        res.status(500).json({ error: 'Error sending message.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error connecting to Telegram.' });
    }
  },
};

export default telegramBotController;
