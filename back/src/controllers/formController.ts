import { Request, Response } from 'express';
import { appendToSheet } from '../models/sheetModel';
import { commissionDataFormSchema, verificationRSDataFormSchema } from '../schema/validationSchemas';
import { isValidDate, processDate } from '../utils';

export const handleCommissionForm = async (req: Request, res: Response) => {
    try {
        const body = commissionDataFormSchema.parse(req.body);
        const commissionsRows = [body.dateCommission, body.employeeName, body.station, body.remarks];

        await appendToSheet('Sheet1!A:D', commissionsRows);
        res.json({ message: 'Данные добавлены' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const handleVerificationRSForm = async (req: Request, res: Response) => {
    try {
        const body = verificationRSDataFormSchema.parse(req.body);
        if (!isValidDate(body.dateVerification)) {
            throw new Error('Некорректный формат даты');
        }

        const { dateVerification, nextYearDate, formattedDate } = processDate(body.dateVerification);
        const radioStationRows = [formattedDate(dateVerification), body.station, body.serialNumber, formattedDate(nextYearDate)];

        await appendToSheet('Sheet2!A:D', radioStationRows);
        res.json({ message: 'Данные добавлены' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
