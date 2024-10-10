import {google} from 'googleapis';

export const SHEET_ID = '1zsAZjXsQPDBvxJt1cGykvFtEB1gCKVPpFD8ckbhZtys';

const client_email = process.env.CLIENT_EMAIL_SHEETS;
const private_key = process.env.PRIVATE_KEY_SHEETS;

const client = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

client.authorize((err, tokens) => {
    if (err) {
        console.error('Ошибка авторизации клиента Google Sheets:', err);
        return;
    } else {
        console.log('Авторизация Google Sheets прошла успешно');
    }
});

const sheets = google.sheets({version: 'v4', auth: client});

export default sheets;
