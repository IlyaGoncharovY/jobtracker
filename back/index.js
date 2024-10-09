const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const token = process.env.TELEGRAM_BOT_TOKEN;
const webTMAUrl = 'https://ilyagoncharovy.github.io/jobtracker/';
const app = express();

app.use(express.json());
app.use(cors());

const webhookUrl = process.env.URL_SERVER;

const bot = new TelegramBot(token);
bot.setWebHook(webhookUrl);

app.post('/telegram-webhook', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log('bot on started')
    if (text === '/start') {
        await bot.sendMessage(chatId, 'Нажмите ниже "Заполнить форму, что бы отправить данные"', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполни форму', web_app: {url: webTMAUrl}}]
                ]
            }
        });

        await bot.sendMessage(chatId, 'hello friend ! :)', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Заполни форму "комисионные"', web_app: {url: webTMAUrl}}],
                    [{text: 'Заполни форму "радостанция"', web_app: {url: `https://ilyagoncharovy.github.io/RadioStationMode`}}]
                ]
            }
        });
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);

            await bot.sendMessage(chatId, 'Форма заполнена!');
            if (data?.selectedEmployeeName) {
                await bot.sendMessage( chatId, 'Комиссионый завершён.');
                await bot.sendMessage( chatId, `Станция: ${data?.selectedStationName}`);
                await bot.sendMessage( chatId, `Принимал участие: ${data?.selectedEmployeeName}`);
                await bot.sendMessage( chatId, `Дата комиссионного: ${data?.formattedDate}`);
                await bot.sendMessage( chatId, `Замечания: ${data?.commissionRemarks}`);
            }

            if (data?.selectedRadioStationName) {
                await bot.sendMessage( chatId, `Станция размещения: ${data?.selectedRadioStationName}`);
                await bot.sendMessage( chatId, `Дата проверки: ${data?.formattedDate}`);
                await bot.sendMessage( chatId, `Серийный номер: ${data?.radioSerialNumber}`);
            }

            setTimeout(async ()=> {
                await bot.sendMessage( chatId, 'Ты молодец! Не забудь похвалить себя :)');
            }, 2000)
        } catch (e) {
            console.log(e)
        }
    }
});
const PORT = 8000;

app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));
