import { getGameById, updateGame, createGame, activeGames } from '../models/gameModel';
import WebSocket from 'ws';

const players = new Map<string, WebSocket>();

export const handlePlayerConnect = (playerId: string, ws: WebSocket): void => {
    let game = Object.values(activeGames).find(g => g.players.some(p => p.id === "waiting"));

    if (!game) {
        const newGame = createGame(playerId, "waiting");
        activeGames[newGame.id] = newGame;
        game = newGame;
        console.log(`Создана новая игра ${newGame.id}. Первый игрок: ${playerId}`);
    } else {
        game.players[1].id = playerId;
        game.currentTurn = 0;
        updateGame(game.id, game);
        console.log(`Игрок ${playerId} присоединился к игре ${game.id}`);
    }

    players.set(playerId, ws);
    sendGameState(game);
};

export const makeMove = (ws: WebSocket, data: any) => {
    const { gameId, playerId, direction } = data;
    console.log(`[MOVE] Игрок ${playerId} выбирает движение "${direction}" в игре ${gameId}`);
    const game = getGameById(gameId);
    if (!game || game.gameOver) {
        console.log(`[MOVE] Игра не найдена или уже завершена.`);
        return;
    }

    const player = game.players.find(p => p.id === playerId);
    if (!player) {
        console.log(`[MOVE] Игрок ${playerId} не найден в игре ${gameId}`);
        return;
    }

    player.move = direction;
    checkTurnCompletion(game);
};

export const makePunch = (ws: WebSocket, data: any) => {
    const { gameId, playerId, attackDirection } = data;
    console.log(`[PUNCH] Игрок ${playerId} выбирает атаку "${attackDirection}" в игре ${gameId}`);
    const game = getGameById(gameId);
    if (!game || game.gameOver) {
        console.log(`[PUNCH] Игра не найдена или уже завершена.`);
        return;
    }

    const player = game.players.find(p => p.id === playerId);
    if (!player) {
        console.log(`[PUNCH] Игрок ${playerId} не найден в игре ${gameId}`);
        return;
    }

    player.setDamage = attackDirection;
    checkTurnCompletion(game);
};

const checkTurnCompletion = (game: any) => {
    const bothPlayersActed = game.players.every((p: any) => p.move !== null && p.setDamage !== null);

    if (bothPlayersActed) {
        console.log(`--------------------------`);
        console.log(`Обработка хода ${game.turnCount + 1} для игры ${game.id}:`);
        game.players.forEach((p: any) => {
            console.log(`Игрок ${p.id}: движение = ${p.move}, атака = ${p.setDamage}, HP = ${p.hp}`);
        });

        game.players.forEach((player: any) => {
            const opponent = game.players.find((p: any) => p.id !== player.id);
            if (opponent) {
                if (player.setDamage === opponent.move) {
                    console.log(
                        `Успешный удар: игрок ${player.id} (атака: ${player.setDamage}) ` +
                        `попал по игроку ${opponent.id} (движение: ${opponent.move}). Наносит урон: ${player.damage}`
                    );
                    opponent.hp -= player.damage;
                } else {
                    console.log(
                        `Промах: игрок ${player.id} (атака: ${player.setDamage}) ` +
                        `не совпадает с движением противника ${opponent.id} (движение: ${opponent.move})`
                    );
                }
            }
        });

        game.turnCount += 1;

        if (game.players.some((p: any) => p.hp <= 0)) {
            game.gameOver = true;
            const winner = game.players.find((p: any) => p.hp > 0);
            if (winner) {
                game.result = `Победил: ${winner.id}`;
                console.log(`Игра ${game.id} окончена. Победил: ${winner.id}`);
            } else {
                game.result = `Оба игрока повержены`;
                console.log(`Игра ${game.id} окончена. Оба игрока повержены`);
            }
        } else if (game.turnCount >= game.maxTurns) {
            game.gameOver = true;
            game.result = `Ничья`;
            console.log(`Игра ${game.id} окончена. Ничья`);
        } else {
            console.log(`Завершён ход ${game.turnCount} в игре ${game.id}`);
        }

        game.players.forEach((p: any) => {
            console.log(`Игрок ${p.id}: HP = ${p.hp}`);
        });

        game.players.forEach((p: any) => {
            p.move = null;
            p.setDamage = null;
        });

        updateGame(game.id, game);
    }

    sendGameState(game);
};

const sendGameState = (game: any) => {
    game.players.forEach((player: any) => {
        const ws = players.get(player.id);
        if (ws) {
            ws.send(JSON.stringify({
                gameId: game.id,
                gameOver: game.gameOver,
                result: game.result,
                turnCount: game.turnCount,
                player,
                opponent: game.players.find((p: any) => p.id !== player.id) || null
            }));
        }
    });
};

