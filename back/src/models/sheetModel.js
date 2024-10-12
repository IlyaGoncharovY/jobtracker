import sheets, {SHEET_ID} from "../client/sheetClient.js";

export const appendToSheet = async (range, values) => {
    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range,
            insertDataOption: 'INSERT_ROWS',
            valueInputOption: 'RAW',
            requestBody: {
                values: [values],
            },
        });
    } catch (err) {
        console.error('Ошибка отправки данных в Google Sheets:', err.response?.data || err.message);
        throw new Error('Ошибка отправки данных');
    }
};
