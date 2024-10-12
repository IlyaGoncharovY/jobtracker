import {memo, useCallback} from 'react';

import {stationData, usersData} from '../../data';
import {sendDataHelper} from '../../common/helpers';
import {FormContainer} from '../../common/components';
import {useSendDataForm, useTelegram} from '../../common/customHook';

export const CommissionMode = memo(() => {
  const {
    commissionEmployee, setCommissionEmployee,
    commissionStation, setCommissionStation,
    commissionDate, setCommissionDate,
    commissionRemarks, setCommissionRemarks,
  } = useSendDataForm();

  const {tg} = useTelegram();

  const onSendData = useCallback((): void => {
    if (!commissionDate) return;

    const selectedEmployeeName = usersData
      .find(user =>
        user.id === Number(commissionEmployee))?.name || 'Неизвестный сотрудник';

    const selectedStationName = stationData
      .find(station =>
        station.id === Number(commissionStation))?.name || 'Неизвестная станция';

    const formattedDate = commissionDate.split('-').reverse().join('-');

    const dataToSend = {
      selectedEmployeeName,
      selectedStationName,
      formattedDate,
      commissionRemarks,
    };

    sendDataHelper({
      formattedDate,
      stationName: selectedStationName,
      employeeName: selectedEmployeeName,
      remarks: commissionRemarks,
      apiUrl: 'https://jobtracker-l44k.onrender.com/send-form-data',
      tg,
      dataToSend,
    });
  }, [commissionDate, commissionEmployee, commissionRemarks, commissionStation, tg]);

  return (
    <FormContainer
      onSendData={onSendData}
      placeholderSelect={'Выберите сотруника'}
      selectorArrDataFirst={usersData}
      selectedValue={commissionEmployee}
      onChangeSelect={setCommissionEmployee}
      placeholderSelectSecond={'Выберите станцию'}
      selectorArrDataSecond={stationData}
      selectedValueSecond={commissionStation}
      onChangeSelectSecond={setCommissionStation}
      dateValue={commissionDate}
      onChangeDate={setCommissionDate}
      inputPlaceholder={'Введите замечания'}
      inputValue={commissionRemarks}
      onChangeInput={setCommissionRemarks}
      buttonText={'Радио-Станция'}
      navigateTo={'/RadioStationMode'}
    />
  );
});
