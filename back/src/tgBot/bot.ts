import TelegramBot, { Message } from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import {sendFormData} from "./services/telegramService";
import {sendCommissionMessage, sendVerificationMessage} from "./view/messages";
import {CommissionDataTypes, VerificationDataTypes} from "../formServer/types/formTypes";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN!;
const webhookUrl = process.env.URL_SERVER!;
const webTMAUrl = 'https://ilyagoncharovy.github.io/jobtracker/';
const webGoogleSheetUrl = 'https://docs.google.com/spreadsheets/d/1zsAZjXsQPDBvxJt1cGykvFtEB1gCKVPpFD8ckbhZtys/edit?gid=1582341699#gid=1582341699';
const webYandexTechCardUrl = 'https://disk.yandex.ru/d/iA59ojO89g5vDw';
const dwarfFightGameUrl = 'https://ilyagoncharovy.github.io/dwarf-fight/';


const bot = new TelegramBot(token, { polling: true });
bot.setWebHook(webhookUrl);

const participants = new Set<number>();
console.log(participants)

bot.on('message', async (msg: Message) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log('bot on started');
    participants.add(chatId);

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);

            // Если данные относятся к комиссионным
            if (data?.selectedEmployeeName) {
                await sendFormData('https://jobtracker-l44k.onrender.com/api/forms/send-commission', {
                    dateCommission: data.formattedDate,
                    employeeName: data.selectedEmployeeName,
                    station: data.selectedStationName,
                    remarks: data.commissionRemarks,
                });

                await bot.sendMessage(chatId, '✅ Форма "Комиссионные" отправлена и данные добавлены.');

                for (const participantChatId of participants) {
                    await bot.sendMessage(participantChatId, '🗣📢🗣📢🗣📢 В табличку, комиссионные 👨🏻‍🔧, внесли новую информацию🗳️.');
                }
            }

            // Если данные относятся к радиостанции
            if (data?.selectedRadioStationName) {
                await sendFormData('https://jobtracker-l44k.onrender.com/api/forms/send-verification', {
                    dateVerification: data.formattedDate,
                    station: data.selectedRadioStationName,
                    serialNumber: data.radioSerialNumber,
                });

                await bot.sendMessage(chatId, '✅ Форма "Радиостанция" отправлена и данные добавлены.');

                for (const participantChatId of participants) {
                    await bot.sendMessage(participantChatId, '🗣📢🗣📢🗣📢 В табличку, радиостанции 📲, внесли новую информацию 🗳️.');
                }
            }
        } catch (e) {
            console.log('Ошибка при отправке данных:', e);
        }
    }
    if (text === '/start') {
        await bot.sendMessage(chatId, 'Нажмите ниже 🪟 "Заполнить форму, что бы отправить данные"', {
            reply_markup: {
                keyboard: [
                    [{text: '➡️ Заполни форму', web_app: {url: webTMAUrl}}]
                ]
            }
        });

        await bot.sendMessage(chatId, '🚀🚀🚀 Бот запущен на все 💯!' +
            'Попробуй заполнить форму 🪪 или посмотри данные в табличке 📃', {
            reply_markup: {
                inline_keyboard: [
                    [{text: '📚 Просмотреть тех-карты', web_app: {url: webYandexTechCardUrl}}],
                    [{text: '📃 Посмотреть таблицу', web_app: {url: webGoogleSheetUrl}}],
                    [{text: '🧙🏼‍♂️ Поиграть в игру', web_app: {url: dwarfFightGameUrl}}]
                ]
            }
        });
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);

            if (data?.selectedEmployeeName) {
                await sendCommissionMessage(bot, chatId, data as CommissionDataTypes);
            }

            if (data?.selectedRadioStationName) {
                await sendVerificationMessage(bot, chatId, data as VerificationDataTypes);
            }

            setTimeout(async ()=> {
                await bot.sendMessage( chatId, '🔥🔥🔥 Ты молодец! Не забудь похвалить себя :)');
            }, 2000)
        } catch (e) {
            console.log(e)
        }
    }
});


export default bot;
