import {memo, useCallback} from 'react';

import {stationForRadioData} from '../../data';
import {FormContainer, FormWrapper} from '../../common/components';
import {useSendDataForm, useTelegram} from '../../common/customHook';
import {sendDataHelper, convertingArray} from '../../common/helpers';

export const RadioStationMode = memo(() => {
  const {
    radioStation, setRadioStation,
    radioDate, setRadioDate,
    radioSerialNumber, setRadioSerialNumber,
  } = useSendDataForm();

  const {tg} = useTelegram();

  const onSendData = useCallback((): void => {
    if (!radioDate) return;

    const selectedRadioStationName = convertingArray(stationForRadioData, radioStation);
    const formattedDate = radioDate.split('-').reverse().join('-');

    const dataToSend = {
      selectedRadioStationName,
      formattedDate,
      radioSerialNumber,
    };

    sendDataHelper({
      formattedDate,
      stationName: selectedRadioStationName,
      serialNumber: radioSerialNumber,
      apiUrl: 'https://jobtracker-l44k.onrender.com/send-form-data-rs',
      tg,
      dataToSend,
    });
  }, [radioDate, radioSerialNumber, radioStation, tg]);

  return (
    <FormWrapper initialX={'100%'} exitX={'-100%'}>
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
    </FormWrapper>
  );
});
