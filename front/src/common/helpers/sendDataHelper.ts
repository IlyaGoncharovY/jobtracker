interface SendDataHelperArgs {
  formattedDate: string;
  stationName?: string;
  serialNumber?: string;
  employeeName?: string;
  remarks?: string;
  apiUrl: string;
  tg: any;
  dataToSend: Record<string, any>;
}

/**
 * Функция-помощник для отправки данных в чат Telegram и заполнения Google Таблицы.
 * @param {SendDataHelperArgs} props - props для "sendDataHelper"
 * @param {string} props.formattedDate - Отформатированная строка с датой.
 * @param {string} [props.stationName] - Название станции (опционально).
 * @param {string} [props.serialNumber] - Серийный номер станции или оборудования (опционально).
 * @param {string} [props.employeeName] - Имя сотрудника (опционально).
 * @param {string} [props.remarks] - Дополнительные замечания или комментарии (опционально).
 * @param {string} props.apiUrl - URL API для отправки данных.
 * @param {any} props.tg - Объект Telegram, используемый для отправки данных в чат.
 * @param {Record<string, any>} props.dataToSend - Данные, которые будут отправлены в Telegram для отображения в чате.
 * @returns {Promise<void>} Промис, который выполняется после успешной отправки данных,
 * или генерирует ошибку в случае неудачи.
 */
export const sendDataHelper = async ({
  formattedDate,
  stationName,
  serialNumber,
  employeeName,
  remarks,
  apiUrl,
  tg,
  dataToSend,
}: SendDataHelperArgs): Promise<void> => {
  tg.sendData(JSON.stringify(dataToSend));

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        dateVerification: formattedDate,
        station: stationName,
        serialNumber: serialNumber,
        dateCommission: formattedDate,
        employeeName: employeeName,
        remarks: remarks,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении данных в Google Sheets');
    }

    console.log('Данные успешно добавлены в Google Sheets');
  } catch (err) {
    const error = err as Error;
    console.log('Ошибка при отправке данных:', error.message);
  }
};
