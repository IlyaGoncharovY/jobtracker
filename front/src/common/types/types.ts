/**
 * тип для элемента массива с данными для отрисовки
 * сотрудников/станций
 * @param {number}  id элемента.
 * @param {string} name - title для элемента.
 */
export type DataArrType = {
    id: number,
    name: string
};

/**
 * строковое значение для определения какое представление формы.
 * Заполнение формы для радио-станций или формы для комиссионных проверок.
 */
export type ViewModeType = 'Радио-Станция' | 'Комиссионные';

/**
 * тип для type in js | null.
 */
export type Nullable<T> = T | null;
