import sheets, {SHEET_ID} from "../client/sheetClient";

export const appendToSheet = async (range: string, values: string[]) => {
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
