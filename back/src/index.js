import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';

import {sendFormData} from "./view/fetchResContainer.js";
import {sendCommissionMessage, sendVerificationMessage} from "./view/viewSendMessage.js";
import {handleCommissionForm, handleVerificationRSForm} from "./controllers/formControllers.js";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const webTMAUrl = 'https://ilyagoncharovy.github.io/jobtracker/';
const webGoogleSheetUrl = 'https://docs.google.com/spreadsheets/d/1zsAZjXsQPDBvxJt1cGykvFtEB1gCKVPpFD8ckbhZtys/edit?gid=1582341699#gid=1582341699';
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

app.post('/send-form-data', handleCommissionForm);
app.post('/send-form-data-rs', handleVerificationRSForm);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log('bot on started')
    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);

            // Если данные относятся к комисионным
            if (data?.selectedEmployeeName) {
                await sendFormData('https://jobtracker-l44k.onrender.com/send-form-data', {
                    dateCommission: data.formattedDate,
                    employeeName: data.selectedEmployeeName,
                    station: data.selectedStationName,
                    remarks: data.commissionRemarks,
                });
                await bot.sendMessage(chatId, 'Форма "Комиссионные" отправлена и данные добавлены.');
            }

            // Если данные относятся к радиостанции
            if (data?.selectedRadioStationName) {
                await sendFormData('https://jobtracker-l44k.onrender.com/send-form-data-rs', {
                    dateVerification: data.formattedDate,
                    station: data.selectedRadioStationName,
                    serialNumber: data.radioSerialNumber,
                });
                await bot.sendMessage(chatId, 'Форма "Радиостанция" отправлена и данные добавлены.');
            }
        } catch (e) {
            console.log('Ошибка при отправке данных:', e);
        }
    }
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
                    [{text: 'Заполни форму для "комисионные/радио-станции"', web_app: {url: webTMAUrl}}],
                    [{text: 'Посмотреть таблицу"', web_app: {url: webGoogleSheetUrl}}]
                ]
            }
        });
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);

            if (data?.selectedEmployeeName) {
                await sendCommissionMessage(bot, chatId, data);
            }

            if (data?.selectedRadioStationName) {
                await sendVerificationMessage(bot, chatId, data);
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
