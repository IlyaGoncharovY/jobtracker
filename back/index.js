const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const url = 'https://ilyagoncharovy.github.io/jobtracker/';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
       await bot.sendMessage(chatId, 'hello friend ! :)', {
           reply_markup: {
               inline_keyboard: [
                   [{text: 'Заполни форму', web_app: {url}}]
               ]
           }
       });
    }
});