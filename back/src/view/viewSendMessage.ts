import TelegramBot from "node-telegram-bot-api";
import {CommissionDataTypes, VerificationDataTypes} from "../type/types";

export const sendCommissionMessage = async (bot: TelegramBot, chatId: number, data: CommissionDataTypes) => {
    await bot.sendMessage(chatId, `✨ Комиссионый завершён.`);
    await bot.sendMessage(chatId, `📌 Станция: ${data?.selectedStationName}`);
    await bot.sendMessage(chatId, `📌 Принимал участие: ${data?.selectedEmployeeName}`);
    await bot.sendMessage(chatId, `📌 Дата комиссионного: ${data?.formattedDate}`);
    await bot.sendMessage(chatId, `📌 Замечания: ${data?.commissionRemarks}`);
};

export const sendVerificationMessage = async (bot: TelegramBot, chatId: number, data: VerificationDataTypes) => {
    await bot.sendMessage(chatId, `📌 Станция размещения: ${data?.selectedRadioStationName}`);
    await bot.sendMessage(chatId, `📌 Дата проверки: ${data?.formattedDate}`);
    await bot.sendMessage(chatId, `📌 Серийный номер: ${data?.radioSerialNumber}`);
};
