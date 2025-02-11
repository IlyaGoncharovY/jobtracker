import { FightState } from '../types/gameTypes';
import { v4 as uuidv4 } from 'uuid';

/**
 * Объект для хранения активных игр.
 * @type {Record<string, FightState>}
 */
export const activeGames: Record<string, FightState> = {};

/**
 * Создаёт новую игру.
 *
 * @param {string} player1Id - Идентификатор первого игрока.
 * @param {string} player2Id - Идентификатор второго игрока.
 * @returns {FightState} Новое состояние игры.
 */
export const createGame = (player1Id: string, player2Id: string): FightState => {
    const gameId = uuidv4();
    const newGame: FightState = {
        id: gameId,
        players: [
            { id: player1Id, hp: 5, damage: 1, move: null, setDamage: null, isHit: false },
            { id: player2Id, hp: 5, damage: 1, move: null, setDamage: null, isHit: false },
        ],
        currentTurn: 0,
        turnCount: 0,
        maxTurns: 15,
        gameOver: false,
    };

    activeGames[newGame.id] = newGame;
    return newGame;
};

/**
 * Возвращает игру по её идентификатору.
 *
 * @param {string} gameId - Идентификатор игры.
 * @returns {FightState|undefined} Состояние игры или undefined, если игра не найдена.
 */
export const getGameById = (gameId: string): FightState | undefined => activeGames[gameId];

/**
 * Обновляет состояние игры.
 *
 * @param {string} gameId - Идентификатор игры.
 * @param {Partial<FightState>} newState - Объект с новыми значениями для состояния игры.
 */
export const updateGame = (gameId: string, newState: Partial<FightState>) => {
    if (activeGames[gameId]) {
        activeGames[gameId] = { ...activeGames[gameId], ...newState };
    }
};
