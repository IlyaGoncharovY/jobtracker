import {FC, memo} from 'react';

import {Button, Input} from '@mui/joy';

import {Nullable, ViewModeType} from '../../common/types';
import {stationData, usersData} from '../../data';
import {SelectContainer} from '../../common/components';
import {DateInput} from '../../common/components/input/dateInput/DateInput.tsx';

interface ICommissionMode {
    changeViewModeHandler: (viewMode: ViewModeType) => void;
    setSelectedEmployee: (value: Nullable<string>) => void;
    setSelectedStation: (value: Nullable<string>) => void;
    setSelectedDate: (value: Nullable<string>) => void;
    setRemarks: (value: string) => void;
    selectedEmployee: Nullable<string>;
    selectedStation: Nullable<string>;
    selectedDate: Nullable<string>;
    remarks: string;
}

/**
 * Форма для отображения формы для заполнения данных по комиссионным осмотрам.
 * @param {ICommissionMode} props - props для "CommissionMode"
 * @param {(viewMode: ViewModeType) => void} props.changeViewModeHandler - функция для смены формы.
 * @param {(value: Nullable<string>) => void} props.setSelectedEmployee - функция для выбора сотрудника.
 * @param {(value: Nullable<string>) => void} props.setSelectedStation - функция для выбора станции.
 * @param {(value: Nullable<string>) => void} props.setSelectedDate - функция для выбора даты.
 * @param {(value: string) => void} props.setRemarks - функция для внесения замечаний.
 * @param {Nullable<string>} props.selectedEmployee - выбранный сотрудник.
 * @param {Nullable<string>) => void} props.selectedStation - выбранная станция.
 * @param {Nullable<string>} props.selectedDate - выбранная дата.
 * @param {string} props.remarks - внесённое замечание.
 */
export const CommissionMode:FC<ICommissionMode> = memo(({
  changeViewModeHandler,
  setSelectedEmployee,
  setSelectedStation,
  setSelectedDate,
  setRemarks,
  selectedEmployee,
  selectedStation,
  selectedDate,
  remarks,
}:ICommissionMode) => {
  return (
    <>
      <SelectContainer
        placeholder={'Выберите сотруника'}
        dataArr={usersData}
        selectedValue={selectedEmployee}
        onChange={setSelectedEmployee}
      />
      <SelectContainer
        placeholder={'Выберите станцию'}
        dataArr={stationData}
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
        placeholder="Введите замечания"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <div>
        <Button onClick={() => changeViewModeHandler('Комиссионные')}>
         Радио-Станция
        </Button>
      </div>
    </>
  );
});
