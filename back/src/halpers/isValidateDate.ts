/**
 * Проверяет валидность даты в формате DD-MM-YYYY.
 *
 * @param {string} dateStr - Дата в формате DD-MM-YYYY.
 * @returns {boolean} Возвращает `true`, если дата валидна, иначе `false`.
 *
 * @example
 * isValidDate('20-11-2024'); // true
 * isValidDate('31-02-2024'); // false (некорректная дата)
 * isValidDate('abcd-ef-gh'); // false (некорректный формат)
 */
export const isValidDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    // Проверяем, что день, месяц и год являются числами
    if (!day || !month || !year) {
        return false;
    }
    // Создаем дату
    const date = new Date(year, month - 1, day);
    // Проверяем, что дата корректная и совпадает с введенными значениями
    return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
    );
};
