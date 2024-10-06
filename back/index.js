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

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);

            await bot.sendMessage('Форма заполнена!');
            if (data?.commissionEmployee) {
                await bot.sendMessage( chatId, 'Комиссионый завершён.');
                await bot.sendMessage( chatId, `Станция: ${data?.commissionStation}`);
                await bot.sendMessage( chatId, `Принимал участие: ${data?.commissionEmployee}`);
                await bot.sendMessage( chatId, `Дата комиссионного: ${data?.commissionDate}`);
                await bot.sendMessage( chatId, `Замечания: ${data?.commissionRemarks}`);
            }

            if (data?.radioStation) {
                await bot.sendMessage( chatId, `Станция размещения: ${data?.radioStation}`);
                await bot.sendMessage( chatId, `Дата проверки: ${data?.radioDate}`);
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
