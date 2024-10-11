import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import {z, ZodError} from 'zod';
import express from 'express';
import cors from 'cors';
import sheets, {SHEET_ID} from './sheetClient.js';
dotenv.config();

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

const commissionDataFormSchema = z.object({
    station: z.string(),
    employeeName: z.string(),
    dateCommission: z.string(),
    remarks: z.string().min(2, {message: 'Если замечаний нет, напиши "Без замечаний"'})
});

const verificationRSDataFormSchema = z.object({
    dateVerification: z.string(),
    station: z.string(),
    serialNumber: z.string(),
});

app.post('/send-form-data', async (req, res) => {
    console.log('post res')
    try {
        const body = commissionDataFormSchema.parse(req.body);

        const commissionsRows = [
            body.dateCommission,
            body.employeeName,
            body.station,
            body.remarks
        ];
        console.log(commissionsRows);

        await sheets.spreadsheets.values.append({
           spreadsheetId: SHEET_ID,
            range: 'Sheet1!A:D',
            insertDataOption: 'INSERT_ROWS',
            valueInputOption: 'RAW',
            requestBody: {
               values: [commissionsRows],
            },
        }).catch(err => {
            console.error('Ошибка отправки формы в гугл таблицы:', err.response?.data || err.message);
        })
        res.json({message: 'Данные добавлены'})
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({e: e.message});
        } else {
            res.status(400).json({e});
        }
    }
});

app.post('/send-form-data-rs', async (req, res) => {
    console.log('post res')
    try {
        const body = verificationRSDataFormSchema.parse(req.body);

        const radioStationRows = [
            body.dateVerification,
            body.station,
            body.serialNumber,
        ];
        console.log(radioStationRows);

        await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'Sheet2!A:C',
            insertDataOption: 'INSERT_ROWS',
            valueInputOption: 'RAW',
            requestBody: {
                values: [radioStationRows],
            },
        }).catch(err => {
            console.error('Ошибка отправки формы в гугл таблицы:', err.response?.data || err.message);
        })
        res.json({message: 'Данные добавлены'})
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({e: e.message});
        } else {
            res.status(400).json({e});
        }
    }
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log('bot on started')
    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);
            // Если данные относятся к комисионным
            if (data?.selectedEmployeeName) {
                await fetch('https://jobtracker-l44k.onrender.com/send-form-data', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        dateCommission: data.formattedDate,
                        employeeName: data.selectedEmployeeName,
                        station: data.selectedStationName,
                        remarks: data.commissionRemarks,
                    }),
                });

                await bot.sendMessage(chatId, 'Форма "Комиссионные" отправлена и данные добавлены.');
            }
            // Если данные относятся к радиостанции
            if (data?.selectedRadioStationName) {
                await fetch('https://jobtracker-l44k.onrender.com/send-form-data-rs', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        dateVerification: data.formattedDate,
                        station: data.selectedRadioStationName,
                        serialNumber: data.radioSerialNumber,
                    }),
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
                    [{text: 'Заполни форму "комисионные"', web_app: {url: webTMAUrl}}],
                    [{text: 'Заполни форму "радостанция"', web_app: {url: webTMAUrl}}]
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
