import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000;

// Allowed origins
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

// Middleware for CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        console.error(`Blocked by CORS: Origin ${origin} not allowed`);
        callback(new Error('Not allowed by CORS')); // Block the request
      }
    },
    credentials: true, // Allow credentials if needed
  })
);

// Middleware for JSON body parsing
app.use(bodyParser.json());

// Handle preflight requests (OPTIONS)
app.options('*', cors());

// Endpoint to handle form submissions
app.post('/api/submit', async (req, res) => {
  try {
    const formData = req.body; // Get the form data from the request body
    const message = `
      New form submission:
      ${JSON.stringify(formData, null, 2)} // Format the message for Telegram
    `;

    await sendToTelegram(message); // Send the message to Telegram
    res.json({ success: true, message: 'Form submitted successfully!' }); // Respond to the client
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'An error occurred' }); // Handle errors
  }
});

// Function to send the message to Telegram
async function sendToTelegram(message) {
  // Define the Telegram API URLs and chat IDs for both bots
  const telegramBots = [
    {
      botToken: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID,
    },
    {
      botToken: process.env.TELEGRAM_BOT_TOKEN_2,
      chatId: process.env.TELEGRAM_CHAT_ID_2,
    },
  ];

  // Send the message to both bots
  for (const bot of telegramBots) {
    const url = `https://api.telegram.org/bot${bot.botToken}/sendMessage`; // Construct the API URL
    console.log(`Sending message to Telegram chat ID ${bot.chatId}:`, message); // Log the message being sent

    try {
      const response = await axios.post(url, {
        chat_id: bot.chatId, // Specify the chat ID
        text: message, // Specify the message text
      });
      console.log(`Telegram API response for chat ID ${bot.chatId}:`, response.data); // Log the response from Telegram
    } catch (err) {
      console.error(
        `Telegram API error for chat ID ${bot.chatId}:`,
        err.response?.data || err.message
      ); // Log any error responses from Telegram
    }
  }
}


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Log the server start message
});
