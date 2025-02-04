import { getGameById, updateGame, createGame } from '../models/gameModel';
import { DirectionType } from '../types/gameTypes';

/**
 * Создание новой игры между двумя игроками
 */
export const startGame = (player1Id: string, player2Id: string) => {
    return createGame(player1Id, player2Id);
};

/**
 * Ход игрока (перемещение)
 */
export const playerMove = (gameId: string, playerId: string, direction: DirectionType) => {
    const game = getGameById(gameId);
    if (!game || game.gameOver) return { error: 'Игра не найдена или завершена' };

    const currentPlayer = game.players[game.currentTurn];
    if (currentPlayer.id !== playerId) return { error: 'Сейчас не ваш ход!' };

    currentPlayer.move = direction;
    updateGame(gameId, { players: game.players });

    return { message: 'Перемещение успешно', game };
};

/**
 * Ход игрока (атака)
 */
export const playerPunch = (gameId: string, playerId: string, attackDirection: DirectionType) => {
    const game = getGameById(gameId);
    if (!game || game.gameOver) return { error: 'Игра не найдена или завершена' };

    const currentPlayerIndex = game.currentTurn;
    const opponentIndex = currentPlayerIndex === 0 ? 1 : 0;

    const currentPlayer = game.players[currentPlayerIndex];
    const opponent = game.players[opponentIndex];

    if (currentPlayer.id !== playerId) return { error: 'Сейчас не ваш ход!' };

    currentPlayer.setDamage = attackDirection;

    if (attackDirection === opponent.move) {
        opponent.hp -= currentPlayer.damage;
    }

    if (opponent.hp <= 0) {
        updateGame(gameId, { gameOver: true });
        return { message: `Игрок ${currentPlayer.id} победил!`, game };
    }

    updateGame(gameId, { players: game.players, currentTurn: opponentIndex });

    return { message: 'Атака прошла успешно', game };
};
