import {memo} from 'react';

import {Button, Input} from '@mui/joy';

import {useNavigate} from 'react-router-dom';

import {stationData, usersData} from '../../data';
import {useSendDataForm} from '../../common/customHook';
import {SelectContainer} from '../../common/components';
import {DateInput} from '../../common/components/input/dateInput/DateInput.tsx';

export const CommissionMode = memo(() => {
  const {
    commissionEmployee, setCommissionEmployee,
    commissionStation, setCommissionStation,
    commissionDate, setCommissionDate,
    commissionRemarks, setCommissionRemarks,
    setViewMode,
  } = useSendDataForm();

  const navigate = useNavigate();

  const navigateToFormHandler = () => {
    setViewMode('Радио-Станция');
    navigate('/RadioStationMode');
  };

  return (
    <>
      <SelectContainer
        placeholder={'Выберите сотруника'}
        dataArr={usersData}
        selectedValue={commissionEmployee}
        onChange={setCommissionEmployee}
      />
      <SelectContainer
        placeholder={'Выберите станцию'}
        dataArr={stationData}
        selectedValue={commissionStation}
        onChange={setCommissionStation}
      />
      <DateInput
        selectedDate={commissionDate}
        onChange={setCommissionDate}
      />
      <Input
        style={{ width: '80%' }}
        size="lg"
        placeholder="Введите замечания"
        value={commissionRemarks}
        onChange={(e) => setCommissionRemarks(e.currentTarget.value)}
      />
      <div>
        <Button onClick={navigateToFormHandler}>
         Радио-Станция
        </Button>
      </div>
    </>
  );
});
