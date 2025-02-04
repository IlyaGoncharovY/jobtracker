import { Request, Response } from 'express';
import { startGame, playerMove, playerPunch } from '../services/gameService';

export const createNewGame = (req: Request, res: Response): void => {
    const { player1, player2 } = req.body;
    if (!player1 || !player2) {
        res.status(400).json({ error: 'Два игрока обязательны' });
        return;
    }

    const game = startGame(player1, player2);
    res.json(game);
};

export const makeMove = (req: Request, res: Response): void => {
    const { gameId, playerId, direction } = req.body;
    if (!gameId || !playerId || !direction) {
        res.status(400).json({ error: 'Данные не полные' });
        return;
    }

    res.json(playerMove(gameId, playerId, direction));
};

export const makePunch = (req: Request, res: Response): void => {
    const { gameId, playerId, attackDirection } = req.body;
    if (!gameId || !playerId || !attackDirection) {
        res.status(400).json({ error: 'Данные не полные' });
        return;
    }

    res.json(playerPunch(gameId, playerId, attackDirection));
};
