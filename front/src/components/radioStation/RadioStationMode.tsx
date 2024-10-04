import {FC, memo} from 'react';

import {Button, Input} from '@mui/joy';

import {stationForRadioData} from '../../data';
import {SelectContainer} from '../../common/components';
import {Nullable, ViewModeType} from '../../common/types';
import {DateInput} from '../../common/components/input/dateInput/DateInput.tsx';

interface IRadioStationMode {
    changeViewModeHandler: (viewMode: ViewModeType) => void
    setSelectedStation: (value: Nullable<string>) => void;
    setSelectedDate: (value: Nullable<string>) => void;
    setSerialNumber: (value: string) => void;
    selectedStation: Nullable<string>;
    selectedDate: Nullable<string>;
    serialNumber: string;
}

/**
 * Форма для отображения формы для заполнения данных по замене радиостанций.
 * @param {IRadioStationMode} props - props для "RadioStationMode"
 * @param {(viewMode: ViewModeType) => void} props.changeViewModeHandler - функция для смены формы.
 * @param {(value: Nullable<string>) => void} props.setSelectedStation - функция для выбора станции.
 * @param {(value: Nullable<string>) => void} props.setSelectedDate - функция для выбора даты.
 * @param {(value: string) => void} props.setSerialNumber - функция для внесения серийного номера.
 * @param {Nullable<string>} props.selectedStation - выбранная станция.
 * @param {Nullable<string>} props.selectedDate - выбранная дата.
 * @param {string} props.serialNumber - внесённый серийный номер.
 */
export const RadioStationMode:FC<IRadioStationMode> = memo(({
  changeViewModeHandler,
  setSelectedStation,
  setSelectedDate,
  setSerialNumber,
  selectedStation,
  selectedDate,
  serialNumber,
}:IRadioStationMode) => {
  return (
    <>
      <SelectContainer
        placeholder={'Выберите станцию'}
        dataArr={stationForRadioData}
        selectedValue={selectedStation}
        onChange={setSelectedStation}
      />
      <DateInput
        selectedDate={selectedDate}
        onChange={setSelectedDate}
      />
      <Input
        style={{ width: '80%' }}
        size="lg"
        placeholder="Серийный номер"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.currentTarget.value)}
      />
      <div>
        <Button onClick={() => changeViewModeHandler('Радио-Станция')}>
            Комиссионные
        </Button>
      </div>
    </>
  );
});
