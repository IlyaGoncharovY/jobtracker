import {useCallback, useEffect, useState} from 'react';
import {Button} from '@mui/joy';

import s from './App.module.css';
import {Nullable, ViewModeType} from './common/types';
import {stationData, stationForRadioData, usersData} from './data';
import {CommissionMode, RadioStationMode, Header} from './components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.WebApp;

export const App = () => {

  const [viewMode, setViewMode] = useState<ViewModeType>('Радио-Станция');

  // Состояния для CommissionMode
  const [commissionEmployee, setCommissionEmployee] = useState<Nullable<string>>(null);
  const [commissionStation, setCommissionStation] = useState<Nullable<string>>(null);
  const [commissionDate, setCommissionDate] = useState<Nullable<string>>(null);
  const [commissionRemarks, setCommissionRemarks] = useState<string>('');

  // Состояния для RadioStationMode
  const [radioStation, setRadioStation] = useState<Nullable<string>>(null);
  const [radioDate, setRadioDate] = useState<Nullable<string>>(null);
  const [radioSerialNumber, setRadioSerialNumber] = useState<string>('');

  useEffect(() => {
    tg.ready();
  }, []);

  const changeViewModeHandler = useCallback((currMode: ViewModeType) => {
    setViewMode(currMode);
  }, []);

  // Обработчик отправки данных для CommissionMode
  const handleCommissionSubmit = useCallback(() => {
    const selectedEmployeeName = usersData
      .find(user =>
        user.id === Number(commissionEmployee))?.name || 'Неизвестный сотрудник';
    const selectedStationName = stationData
      .find(station =>
        station.id === Number(commissionStation))?.name || 'Неизвестная станция';

    console.log('Selected Employee:', selectedEmployeeName);
    console.log('Selected Station:', selectedStationName);
    console.log('Selected Date:', commissionDate);
    console.log('Remarks:', commissionRemarks);

    setCommissionEmployee(null);
    setCommissionStation(null);
    setCommissionDate(null);
    setCommissionRemarks('');
  }, [commissionDate, commissionEmployee, commissionRemarks, commissionStation]);

  // Обработчик отправки данных для RadioStationMode
  const handleRadioSubmit = useCallback(() => {
    const selectedRadioStationName = stationForRadioData
      .find(radio =>
        radio.id === Number(radioStation))?.name || 'Неизвестная станция';

    console.log('Radio - Selected Station:', selectedRadioStationName);
    console.log('Radio - Selected Date:', radioDate);
    console.log('Radio - Serial Number:', radioSerialNumber);

    setRadioStation(null);
    setRadioDate(null);
    setRadioSerialNumber('');
  }, [radioStation, radioDate, radioSerialNumber]);

  return (
    <div className={s.AppContainer}>
      <Header/>
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
