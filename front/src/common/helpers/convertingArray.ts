import {DataArrType, Nullable} from '../types';

/**
 * Функция для поиска имени/названия станции по заданному идентификатору.
 * Возвращает имя станции, если совпадение найдено, иначе возвращает 'Неизвестный элемент'.
 *
 * @param {DataArrType[]} dataArr - Массив объектов, содержащих данные для селектора.
 * @param {Nullable<string>} titleForName - Идентификатор выбранного элемента в виде строки (или null).
 * @returns {string} Имя найденного элемента или 'Неизвестный элемент', если совпадений нет.
 */
export const convertingArray = (dataArr:  DataArrType[], titleForName:  Nullable<string>): string => {
  return dataArr.find(user =>
    user.id === Number(titleForName))?.name || 'Неизвестный элемент';
};
