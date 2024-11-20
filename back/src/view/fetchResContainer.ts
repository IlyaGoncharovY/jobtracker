export const sendFormData = async (url: string, data: any) => {
    console.log('sendFormData - called')
    console.log(data)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Ошибка при отправке данных на ${url}`);
        }
    } catch (error) {
        console.log('Ошибка при отправке данных:', error);
    }
};
