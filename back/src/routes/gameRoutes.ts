import express from 'express';
import { createNewGame, makeMove, makePunch } from '../controllers/gameController';

const router = express.Router();

router.post('/start', createNewGame);
router.post('/move', makeMove);
router.post('/punch', makePunch);

export default router;
