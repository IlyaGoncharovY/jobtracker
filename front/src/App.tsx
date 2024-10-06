import {useEffect} from 'react';
import {Button} from '@mui/joy';

import {Navigate, Route, Routes} from 'react-router-dom';

import s from './App.module.css';
import {useSendDataForm, useTelegram} from './common/customHook';
import {CommissionMode, Header, RadioStationMode} from './components';

export const App = () => {

  const {tg, onToggleButton} = useTelegram();
  const {
    viewMode,
    handleCommissionSubmit,
    handleRadioSubmit,
  } = useSendDataForm();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className={s.AppContainer}>
      <Header/>
      <Button onClick={onToggleButton}>тогл</Button>
      <Routes>
        <Route path="/" element={<CommissionMode />} />
        <Route path="/RadioStationMode" element={<RadioStationMode />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Button
        onClick={viewMode === 'Радио-Станция' ?
          handleCommissionSubmit :
          handleRadioSubmit}>
                Отправить данные
      </Button>
    </div>
  );
};
