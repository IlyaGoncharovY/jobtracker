import {memo, useEffect} from 'react';

import {Button, Input} from '@mui/joy';

import {useNavigate} from 'react-router-dom';

import {stationForRadioData} from '../../data';
import {SelectContainer} from '../../common/components';
import {useSendDataForm, useTelegram} from '../../common/customHook';
import {DateInput} from '../../common/components/input/dateInput/DateInput.tsx';

export const RadioStationMode = memo(() => {
  const {
    radioStation, setRadioStation,
    radioDate, setRadioDate,
    radioSerialNumber, setRadioSerialNumber,
    setViewMode,
  } = useSendDataForm();

  const {tg} = useTelegram();

  const navigate = useNavigate();

  const navigateToFormHandler = () => {
    setViewMode('Комиссионные');
    navigate('/');
  };

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные',
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (!radioStation || !radioDate || !radioSerialNumber) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [radioDate, radioSerialNumber, radioStation, tg.MainButton]);

  return (
    <>
      <SelectContainer
        placeholder={'Выберите станцию'}
        dataArr={stationForRadioData}
        selectedValue={radioStation}
        onChange={setRadioStation}
      />
      <DateInput
        selectedDate={radioDate}
        onChange={setRadioDate}
      />
      <Input
        style={{ width: '80%' }}
        size="lg"
        placeholder="Серийный номер"
        value={radioSerialNumber}
        onChange={(e) => setRadioSerialNumber(e.currentTarget.value)}
      />
      <div>
        <Button onClick={navigateToFormHandler}>
            Комиссионные
        </Button>
      </div>
    </>
  );
});
