import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import formRoutes from './routes/formRoutes';
import botRoutes from './routes/botRoutes';
import gameRoutes from "./routes/gameRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/forms', formRoutes);
app.use('/api/bot', botRoutes);

app.use('/api/game', gameRoutes);

export default app;
