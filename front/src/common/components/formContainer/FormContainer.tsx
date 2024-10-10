import {FC, memo, useEffect} from 'react';

import {Button, Input} from '@mui/joy';

import {useNavigate} from 'react-router-dom';

import {useTelegram} from '../../customHook';

import {DateInput} from '../input/dateInput/DateInput.tsx';
import {SelectContainer} from '../select/SelectContainer.tsx';
import {DataArrType, Nullable, ViewModeType} from '../../types';

interface IFormContainer {
    onSendData: () => void
    placeholderSelect: string
    placeholderSelectSecond?: string
    selectorArrDataFirst: DataArrType[]
    selectorArrDataSecond?: DataArrType[]
    selectedValue:  Nullable<string>
    onChangeSelect: (value: Nullable<string>) => void
    selectedValueSecond?:  Nullable<string>
    onChangeSelectSecond?: (value: Nullable<string>) => void
    dateValue: Nullable<string>
    onChangeDate: (value: Nullable<string>) => void
    inputPlaceholder: string
    inputValue: string
    onChangeInput: (value: string) => void
    buttonText: ViewModeType
    navigateTo: string
}

/**
 * Универсальный контейнер для форм.
 * @param {IFormContainer} props - props для FormContainer.
 * @param {() => void} props.onSendData - функция для оправки анных в телеграмм.
 * @param {string} props.placeholderSelect - плейсхолдер для селекта.
 * @param {string} [props.placeholderSelectSecond] - плейсхолдер для второго селекта.
 * @param {DataArrType[]} props.selectorArrDataFirst - массив option для селекта.
 * @param {DataArrType[]} [props.selectorArrDataSecond]  - массив option для второго селекта.
 * @param {Nullable<string>} props.selectedValue - значение для селекта.
 * @param {(value: Nullable<string>) => void} props.onChangeSelect - функция сохранения выбранного элемента селекта.
 * @param {Nullable<string>} [props.selectedValueSecond] - значение для второго селекта.
 * @param {(value: Nullable<string>) => void} [props.onChangeSelectSecond] - функция сохранения
 * выбранного элемента второго селекта.
 * @param {Nullable<string>} props.dateValue - значение даты.
 * @param {(value: Nullable<string>) => void} props.onChangeDate - функция сохранения даты.
 * @param {string} props.inputPlaceholder - плейсхолдер инпута ввода текста.
 * @param {string} props.inputValue - введённое знаечение инпута.
 * @param {(value: string) => void} props.onChangeInput - функция сохранения введённого в инпут значения.
 * @param {ViewModeType} props.buttonText - текст кнопки.
 * @param {string} props.navigateTo - функция навигации.
 * @constructor
 */
export const FormContainer:FC<IFormContainer> = memo(({
  onSendData,
  placeholderSelect,
  placeholderSelectSecond,
  selectorArrDataFirst,
  selectorArrDataSecond,
  selectedValue,
  onChangeSelect,
  selectedValueSecond,
  onChangeSelectSecond,
  dateValue,
  onChangeDate,
  inputPlaceholder,
  inputValue,
  onChangeInput,
  buttonText,
  navigateTo,
}:IFormContainer) => {

  const { tg } = useTelegram();
  const navigate = useNavigate();

  const navigateToFormHandler = () => {
    navigate(navigateTo);
  };

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные',
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (!selectedValue || !dateValue || !inputValue) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [dateValue, selectedValue, inputValue, tg.MainButton, selectedValueSecond]);

  return (
    <>
      <SelectContainer
        placeholder={placeholderSelect}
        dataArr={selectorArrDataFirst}
        selectedValue={selectedValue}
        onChange={onChangeSelect}
      />
      {placeholderSelectSecond &&
            <SelectContainer
              placeholder={placeholderSelectSecond}
              dataArr={selectorArrDataSecond}
              selectedValue={selectedValueSecond}
              onChange={onChangeSelectSecond}
            />
      }
      <DateInput
        selectedDate={dateValue}
        onChange={onChangeDate}
      />
      <Input
        style={{ width: '80%' }}
        size="lg"
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={(e) => onChangeInput(e.currentTarget.value)}
      />
      <div>
        <Button onClick={navigateToFormHandler}>
          {buttonText}
        </Button>
      </div>
    </>
  );
});
