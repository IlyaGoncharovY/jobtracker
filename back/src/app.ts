import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import formRoutes from './formServer/routes/formRoutes';
import botRoutes from './tgBot/routes/botRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/forms', formRoutes);
app.use('/api/bot', botRoutes);

export default app;
