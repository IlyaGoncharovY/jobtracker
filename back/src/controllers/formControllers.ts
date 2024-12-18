import { ZodError } from 'zod';
import { Request, Response } from 'express';
import { appendToSheet } from '../models/sheetModel';
import { commissionDataFormSchema, verificationRSDataFormSchema } from '../schema/validationSchemas';
import {isValidDate, processDate} from "../halpers";
import {CommissionDataTypes, VerificationDataTypes} from "../type/types";

export const handleCommissionForm = async (
    req: Request<{}, {}, CommissionDataTypes>,
    res: Response): Promise<void> => {
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

export const handleVerificationRSForm = async (
    req: Request<{}, {}, VerificationDataTypes>,
    res: Response): Promise<void> => {
    try {
        const body = verificationRSDataFormSchema.parse(req.body);

        if (!isValidDate(body.dateVerification)) {
            throw new Error('Некорректный формат даты');
        }

        const { dateVerification, nextYearDate, formattedDate } = processDate(body.dateVerification);

        const radioStationRows = [
            formattedDate(dateVerification),
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

const handleError = (e, res: Response) => {
    console.error('Ошибка на сервере:', e);
    if (e instanceof ZodError) {
        res.status(400).json({ error: e.errors });
    } else {
        res.status(400).json({ error: e.message });
    }
};
