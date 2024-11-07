import {useEffect} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import s from './App.module.css';
import {useTelegram} from './common/customHook';
import {CommissionMode, Header, RadioStationMode} from './components';

export const App = () => {

  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

    console.log('test linter log')
  return (
    <div className={s.AppContainer}>
      <Header/>
      <Routes>
        <Route path="/" element={<CommissionMode />} />
        <Route path="/RadioStationMode" element={<RadioStationMode />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
