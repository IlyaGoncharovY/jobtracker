import {google} from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
export const SHEET_ID = '1zsAZjXsQPDBvxJt1cGykvFtEB1gCKVPpFD8ckbhZtys';

const client_email = process.env.CLIENT_EMAIL_SHEETS;

const private_key = process.env.PRIVATE_KEY_SHEETS.split(String.raw`\n`).join('\n');

const client = new google.auth.JWT(
    client_email,
    null,
    private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

client.authorize((err: Error) => {
    if (err) {
        console.error('Ошибка авторизации клиента Google Sheets:', err);
        return;
    } else {
        console.log('Авторизация Google Sheets прошла успешно');
    }
});

const sheets = google.sheets({version: 'v4', auth: client});

export default sheets;
