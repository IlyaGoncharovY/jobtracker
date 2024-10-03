import {useEffect, useState} from 'react';
import {Button, Input, Option, Select, Stack} from '@mui/joy';

import s from './App.module.css';

import {stationData, stationForRadioData, usersData} from './data/DataSet.ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.WebApp;

export const App = () => {

  const [viewMode, setViewMode] = useState<'Радио-Станция' | 'Комиссионные'>('Радио-Станция');

  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  const changeViewModeHandler = (currMode: 'Радио-Станция' | 'Комиссионные') => {
    setViewMode(currMode);
  };

  return (
    <div className={s.AppContainer}>
      <Button onClick={onClose}>
                закрыть
      </Button>
      {viewMode === 'Радио-Станция' ? (
        <>
          <Select
            placeholder="Выберите сотруника"
            size="lg" style={{width: '80%'}}>
            {usersData.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Выберите станцию"
            size="lg" style={{width: '80%'}}>
            {stationData.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
          <Stack
            spacing={1.5}
            sx={{width: '80%'}}>
            <Input
              type="date"
              slotProps={{}}
            />
          </Stack>
          <Input style={{width: '80%'}} size="lg" placeholder="Введите замечания"/>
          <div>
            <Button onClick={() => changeViewModeHandler('Комиссионные')}>
                                Радио-Станция
            </Button>
          </div>
        </>)
        : (
          <>
            <Select
              placeholder="Выберите станцию"
              size="lg" style={{width: '80%'}}>
              {stationForRadioData.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
            <p>
                  дата проверки
            </p>
            <Stack
              spacing={1.5}
              sx={{width: '80%'}}>
              <Input
                type="date"
                slotProps={{}}
              />
            </Stack>
            <Input style={{width: '80%'}} size="lg" placeholder="Серийный номер"/>
            <div>
              <Button onClick={() => changeViewModeHandler('Радио-Станция')}>
                               Комиссионные
              </Button>
            </div>
          </>)}
      <Button>
            Отправить данные
      </Button>
    </div>
  );
};
