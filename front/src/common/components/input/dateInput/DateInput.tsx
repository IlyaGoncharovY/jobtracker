import {Input, Stack} from '@mui/joy';
import {FC, memo} from 'react';

import {Nullable} from '../../../types';

interface IDateInput {
    selectedDate: Nullable<string>;
    onChange: (value: Nullable<string>) => void;
}

/**
 * Универсальный input с date picker`ом.
 * @param {IDateInput} props - props для "DateInput"
 * @param {Nullable<string>} props.selectedDate - выбранная дата.
 * @param {(value: Nullable<string>) => void} props.onChange - функция для сохранения даты.
 * @constructor
 */
export const DateInput:FC<IDateInput> = memo(({
  selectedDate,
  onChange,
}:IDateInput) => {
  return (
    <Stack
      spacing={1.5}
      sx={{width: '80%'}}>
      <p>
      дата проверки
      </p>
      <Input
        type="date"
        value={selectedDate || ''}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </Stack>
  );
});
