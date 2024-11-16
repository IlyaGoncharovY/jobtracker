import {useEffect} from 'react';

import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import {AnimatePresence} from 'framer-motion';

import s from './App.module.css';
import {useTelegram} from './common/customHook';
import {CommissionMode, Header, RadioStationMode} from './components';

export const App = () => {

  const {tg} = useTelegram();
  const location = useLocation();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className={s.AppContainer}>
      <Header/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<CommissionMode />} />
          <Route path="/RadioStationMode" element={<RadioStationMode />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};
