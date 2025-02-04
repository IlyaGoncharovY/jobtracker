import {memo, useCallback} from 'react';

import {stationData, usersData} from '../../data';
import {FormContainer, FormWrapper} from '../../common/components';
import {useSendDataForm, useTelegram} from '../../common/customHook';
import {sendDataHelper, convertingArray} from '../../common/helpers';

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

    const selectedEmployeeName = convertingArray(usersData, commissionEmployee);
    const selectedStationName = convertingArray(stationData, commissionStation);

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
      apiUrl: 'https://jobtracker-l44k.onrender.com/api/forms/send-commission',
      tg,
      dataToSend,
    });
  }, [commissionDate, commissionEmployee, commissionRemarks, commissionStation, tg]);

  return (
    <FormWrapper initialX={'-100%'} exitX={'100%'}>
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
    </FormWrapper>
  );
});
