import {useCallback, useEffect, useState} from 'react';
import {Button} from '@mui/joy';

import s from './App.module.css';
import {ViewModeType} from './common/types';
import {CommissionMode, Header, RadioStationMode} from './components';
import {useSendDataForm, useTelegram} from './common/customHook';

export const App = () => {

  const {tg, onToggleButton} = useTelegram();
  const {
    commissionEmployee, setCommissionEmployee,
    commissionStation, setCommissionStation,
    commissionDate, setCommissionDate,
    commissionRemarks, setCommissionRemarks,
    radioStation, setRadioStation,
    radioDate, setRadioDate,
    radioSerialNumber, setRadioSerialNumber,
    handleCommissionSubmit,
    handleRadioSubmit,
  } = useSendDataForm();

  const [viewMode, setViewMode] = useState<ViewModeType>('Радио-Станция');

  useEffect(() => {
    tg.ready();
  }, [tg]);

  const changeViewModeHandler = useCallback((currMode: ViewModeType) => {
    setViewMode(currMode);
  }, []);

  return (
    <div className={s.AppContainer}>
      <Header/>
      <Button onClick={onToggleButton}>тогл</Button>
      {viewMode === 'Радио-Станция' ?
        (<CommissionMode
          changeViewModeHandler={changeViewModeHandler}
          setSelectedEmployee={setCommissionEmployee}
          setSelectedStation={setCommissionStation}
          setSelectedDate={setCommissionDate}
          setRemarks={setCommissionRemarks}
          selectedEmployee={commissionEmployee}
          selectedStation={commissionStation}
          selectedDate={commissionDate}
          remarks={commissionRemarks}
        />) :
        (<RadioStationMode
          changeViewModeHandler={changeViewModeHandler}
          setSelectedStation={setRadioStation}
          setSelectedDate={setRadioDate}
          setSerialNumber={setRadioSerialNumber}
          selectedStation={radioStation}
          selectedDate={radioDate}
          serialNumber={radioSerialNumber}
        />)}
      <Button
        onClick={viewMode === 'Радио-Станция' ?
          handleCommissionSubmit :
          handleRadioSubmit}>
                Отправить данные
      </Button>
    </div>
  );
};
