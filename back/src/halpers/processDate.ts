/**
 * Форматирует дату в формате DD-MM-YYYY и вычисляет дату на следующий год.
 *
 * @param {string} dateStr - Дата в формате DD-MM-YYYY.
 * @returns {{ dateVerification: Date, nextYearDate: Date, formattedDate: (date: Date) => string }}
 * Объект, содержащий исходную дату, дату через год и функцию для форматирования дат.
 */
export const processDate = (
    dateStr: string): {
    dateVerification: Date;
    nextYearDate: Date;
    formattedDate: (date: Date) => string;
} => {
    const [day, month, year] = dateStr.split('-').map(Number);
    const dateVerification = new Date(year, month - 1, day);
    const nextYearDate = new Date(dateVerification);
    nextYearDate.setFullYear(dateVerification.getFullYear() + 1);

    const formattedDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return { dateVerification, nextYearDate, formattedDate };
};
