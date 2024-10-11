import {memo, useCallback} from 'react';

import {stationForRadioData} from '../../data';
import {FormContainer} from '../../common/components';
import {useSendDataForm, useTelegram} from '../../common/customHook';

export const RadioStationMode = memo(() => {
  const {
    radioStation, setRadioStation,
    radioDate, setRadioDate,
    radioSerialNumber, setRadioSerialNumber,
  } = useSendDataForm();

  const {tg} = useTelegram();

  const onSendData = useCallback(async () => {
    if (!radioDate) return;

    const selectedRadioStationName = stationForRadioData
      .find(radio =>
        radio.id === Number(radioStation))?.name || 'Неизвестная станция';

    const formattedDate = radioDate.split('-').reverse().join('-');

    const data = {
      selectedRadioStationName,
      formattedDate,
      radioSerialNumber,
    };
    tg.sendData(JSON.stringify(data));
    try {
      const response = await fetch('https://jobtracker-l44k.onrender.com/send-form-data-rs', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          dateVerification: formattedDate,
          station: selectedRadioStationName,
          serialNumber: radioSerialNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении данных в Google Sheets');
      }

      console.log('Данные успешно добавлены в Google Sheets');
    } catch (err: any) {
      console.log('Ошибка при отправке данных:', err.message);
    }
  }, [radioDate, radioSerialNumber, radioStation, tg]);

  return (
    <FormContainer
      onSendData={onSendData}
      placeholderSelect={'Выберите станцию'}
      selectorArrDataFirst={stationForRadioData}
      selectedValue={radioStation}
      onChangeSelect={setRadioStation}
      dateValue={radioDate}
      onChangeDate={setRadioDate}
      inputPlaceholder={'Серийный номер'}
      inputValue={radioSerialNumber}
      onChangeInput={setRadioSerialNumber}
      buttonText={'Комиссионные'}
      navigateTo={'/'}
    />
  );
});
