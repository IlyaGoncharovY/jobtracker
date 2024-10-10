import {google} from 'googleapis';

export const SHEET_ID = '1zsAZjXsQPDBvxJt1cGykvFtEB1gCKVPpFD8ckbhZtys';

const client_email = process.env.CLIENT_EMAIL_SHEETS;
const private_key = process.env.PRIVATE_KEY_SHEETS;

const client = new google.auth.JWT(client_email, null, private_key, [
    'https://www.googleapis.com/auth/spreadsheets'
]);

const sheets = google.sheets({version: 'v4', auth: client});

export default sheets;
