import { FightState } from '../types/gameTypes';
import { v4 as uuidv4 } from 'uuid';

const activeGames: Record<string, FightState> = {};

export const createGame = (player1Id: string, player2Id: string): FightState => {
    const gameId = uuidv4();
    const newGame: FightState = {
        id: gameId,
        players: [
            { id: player1Id, hp: 5, damage: 1, move: 'center', setDamage: 'center' },
            { id: player2Id, hp: 5, damage: 1, move: 'center', setDamage: 'center' },
        ],
        currentTurn: 0,
        turnCount: 0,
        maxTurns: 15,
        gameOver: false,
    };

    activeGames[gameId] = newGame;
    return newGame;
};

export const getGameById = (gameId: string): FightState | undefined => activeGames[gameId];

export const updateGame = (gameId: string, newState: Partial<FightState>) => {
    if (activeGames[gameId]) {
        activeGames[gameId] = { ...activeGames[gameId], ...newState };
    }
};
