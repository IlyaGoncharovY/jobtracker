const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const webTMAUrl = 'https://ilyagoncharovy.github.io/jobtracker/';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Нажмите ниже "Заполнить форму, что бы отправить данные"', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполни форму', web_app: {url: webTMAUrl + '/RadioStationMode'}}]
                ]
            }
        });

       await bot.sendMessage(chatId, 'hello friend ! :)', {
           reply_markup: {
               inline_keyboard: [
                   [{text: 'Заполни форму чат', web_app: {url: webTMAUrl + '/'}}]
               ]
           }
       });
    }
});
