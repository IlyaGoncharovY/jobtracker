import { Request, Response } from 'express';
import bot from '../bot/bot';

export const botWebhookHandler = (req: Request, res: Response) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
};
