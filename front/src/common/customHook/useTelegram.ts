// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.WebApp;

/**
 * хук для использования объекта tg, и его функционала.
 * @returns {Object} Объект, содержащий данный с api телеграма, а так же функции для взаимодействия с ним.
 * @return {Object} tg - оъект из tg api,
 * @return {() => void} onCloseTMA - функция для закрытия TMA,
 * @return {Object} userTG - обьект с информаией по пользователю TG.
 * @return {() => void} onToggleButton - функция для отображения кнопки в чате TG.
 */
export const useTelegram = () => {

  const onCloseTMA = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  const userTG = tg.initDataUnsafe?.user;

  return {
    tg,
    onCloseTMA,
    userTG,
    onToggleButton,
  };
};
