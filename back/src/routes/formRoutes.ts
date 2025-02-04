import express from 'express';
import { handleCommissionForm, handleVerificationRSForm } from '../controllers/formController';

const router = express.Router();

router.post('/send-commission', handleCommissionForm);
router.post('/send-verification', handleVerificationRSForm);

export default router;
