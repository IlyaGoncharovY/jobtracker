export const sendFormData = async (url: string, data: any) => {
    console.log('📡 Отправка данных:', url, data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const responseBody = await response.json();
        console.log('✅ Ответ сервера:', responseBody);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP ${response.status}: ${responseBody.error || 'Неизвестная ошибка'}`);
        }

        return responseBody;
    } catch (error) {
        console.error('❌ Ошибка при отправке данных:', error);
        return { error: error.message };
    }
};
