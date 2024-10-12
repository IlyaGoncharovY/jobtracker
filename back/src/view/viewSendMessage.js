export const sendCommissionMessage = async (bot, chatId, data) => {
    await bot.sendMessage(chatId, `Комиссионый завершён.`);
    await bot.sendMessage(chatId, `Станция: ${data?.selectedStationName}`);
    await bot.sendMessage(chatId, `Принимал участие: ${data?.selectedEmployeeName}`);
    await bot.sendMessage(chatId, `Дата комиссионного: ${data?.formattedDate}`);
    await bot.sendMessage(chatId, `Замечания: ${data?.commissionRemarks}`);
};

export const sendVerificationMessage = async (bot, chatId, data) => {
    await bot.sendMessage(chatId, `Станция размещения: ${data?.selectedRadioStationName}`);
    await bot.sendMessage(chatId, `Дата проверки: ${data?.formattedDate}`);
    await bot.sendMessage(chatId, `Серийный номер: ${data?.radioSerialNumber}`);
};
