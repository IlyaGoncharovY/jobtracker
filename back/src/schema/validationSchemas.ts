import { z } from 'zod';

export const commissionDataFormSchema = z.object({
    station: z.string(),
    employeeName: z.string(),
    dateCommission: z.string(),
    remarks: z.string().min(2, { message: 'Если замечаний нет, напиши "Без замечаний"' })
});

export const verificationRSDataFormSchema = z.object({
    dateVerification: z.string(),
    station: z.string(),
    serialNumber: z.string(),
});
