import {Option, Select} from '@mui/joy';
import {FC, memo} from 'react';

import {DataArrType, Nullable} from '../../types';

interface ISelectContainer {
    placeholder: string,
    dataArr: DataArrType[] | undefined,
    selectedValue: Nullable<string> | undefined;
    onChange: ((value: Nullable<string>) => void) | undefined;
}

/**
 * Универсальный селект для отрисовки в форме добавления данных.
 * @param {ISelectContainer} props - props для "SelectContainer"
 * @param {string} props.placeholder - placeholder для селектора.
 * @param {DataArrType[] | undefined} props.dataArr - массив данных для отрисовки.
 * @param {Nullable<string> | undefined} props.selectedValue - выбранный элемент массива.
 * @param {((value: Nullable<string>) => void) | undefined) => void} props.onChange - функция для
 * выбора элемента массива.
 * @constructor
 */
export const SelectContainer: FC<ISelectContainer> = memo(({
  placeholder,
  dataArr,
  selectedValue,
  onChange,
}: ISelectContainer) => {
  if (!onChange) {
    return;
  }
  return (
    <Select
      placeholder={placeholder}
      size="lg"
      style={{ width: '80%' }}
      value={selectedValue || ''}
      onChange={(_, newValue) => onChange(newValue)}>
      {dataArr?.map((user) => (
        <Option key={user.id} value={user.id}>
          {user.name}
        </Option>
      ))}
    </Select>
  );
});
