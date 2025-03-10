import { WebSocketServer } from 'ws';
import http from "http";
import app from "./app";
import {handleChatMessage, handlePlayerConnect, makeMove, makePunch} from "./game/controllers/gameController";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`HTTP сервер запущен на порту ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Новое WebSocket-соединение установлено");

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message.toString());

            switch (data.type) {
                case "join":
                    handlePlayerConnect(data.playerId, ws);
                    break;
                case "move":
                    makeMove(ws, data);
                    break;
                case "punch":
                    makePunch(ws, data);
                    break;
                case "chat":
                    handleChatMessage(data);
                    break;
                default:
                    console.warn("Неизвестный тип сообщения:", data.type);
            }
        } catch (error) {
            console.error("Ошибка при разборе сообщения:", error);
        }
    });

    ws.on("close", () => {
        console.log("Игрок отключился");
    });

    ws.on("error", (err) => {
        console.error("Ошибка WebSocket-соединения:", err);
    });
});

console.log("WebSocket сервер запущен и работает вместе с HTTP сервером");
