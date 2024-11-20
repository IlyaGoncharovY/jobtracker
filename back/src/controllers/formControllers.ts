import { ZodError } from 'zod';
import { appendToSheet } from '../models/sheetModel';
import { commissionDataFormSchema, verificationRSDataFormSchema } from '../schema/validationSchemas';

export const handleCommissionForm = async (req, res) => {
    try {
        const body = commissionDataFormSchema.parse(req.body);
        const commissionsRows = [
            body.dateCommission,
            body.employeeName,
            body.station,
            body.remarks
        ];
        console.log('Данные комиссионного:')
        console.log(commissionsRows);
        await appendToSheet('Sheet1!A:D', commissionsRows);
        res.json({ message: 'Данные добавлены' });
    } catch (e) {
        handleError(e, res);
    }
};

export const handleVerificationRSForm = async (req, res) => {
    try {
        const body = verificationRSDataFormSchema.parse(req.body);

        // Проверка валидности даты
        const isValidDate = (dateStr) => {
            const [day, month, year] = dateStr.split('-').map(Number);
            // Проверяем, что день, месяц и год являются числами
            if (!day || !month || !year) {
                return false;
            }
            // Создаем дату
            const date = new Date(year, month - 1, day);
            // Проверяем, что дата корректная и совпадает с введенными значениями
            return (
                date.getDate() === day &&
                date.getMonth() === month - 1 &&
                date.getFullYear() === year
            );
        };

        if (!isValidDate(body.dateVerification)) {
            throw new Error('Некорректный формат даты');
        }

        const [day, month, year] = body.dateVerification.split('-').map(Number);
        const dateVerification = new Date(year, month - 1, day);
        const nextYearDate = new Date(dateVerification);
        nextYearDate.setFullYear(dateVerification.getFullYear() + 1);

        const formattedDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const radioStationRows = [
            body.dateVerification,
            body.station,
            body.serialNumber,
            formattedDate(nextYearDate),
        ];
        console.log('Данные радио-станции:')
        console.log(radioStationRows);
        await appendToSheet('Sheet2!A:D', radioStationRows);
        res.json({ message: 'Данные добавлены' });
    } catch (e) {
        handleError(e, res);
    }
};

const handleError = (e, res) => {
    console.error('Ошибка на сервере:', e);
    if (e instanceof ZodError) {
        res.status(400).json({ error: e.errors });
    } else {
        res.status(400).json({ error: e.message });
    }
};
