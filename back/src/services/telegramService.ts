export const sendFormData = async (url: string, data: any) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Ошибка при отправке данных на ${url}`);
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }
};
