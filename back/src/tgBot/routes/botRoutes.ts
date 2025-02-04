import express from 'express';
import { botWebhookHandler } from '../controllers/botController';

const router = express.Router();

router.post('/webhook', botWebhookHandler);

export default router;
