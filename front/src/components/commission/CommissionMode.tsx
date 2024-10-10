import {memo, useCallback} from 'react';

import {stationData, usersData} from '../../data';
import {useSendDataForm, useTelegram} from '../../common/customHook';
import {FormContainer} from '../../common/components';

export const CommissionMode = memo(() => {
  const {
    commissionEmployee, setCommissionEmployee,
    commissionStation, setCommissionStation,
    commissionDate, setCommissionDate,
    commissionRemarks, setCommissionRemarks,
  } = useSendDataForm();

  const {tg} = useTelegram();

  const onSendData = useCallback(async () => {
    if (!commissionDate) return;

    const selectedEmployeeName = usersData
      .find(user =>
        user.id === Number(commissionEmployee))?.name || 'Неизвестный сотрудник';

    const selectedStationName = stationData
      .find(station =>
        station.id === Number(commissionStation))?.name || 'Неизвестная станция';

    const formattedDate = commissionDate.split('-').reverse().join('-');

    const data = {
      selectedEmployeeName,
      selectedStationName,
      formattedDate,
      commissionRemarks,
    };
    tg.sendData(JSON.stringify(data))
      .then(async () => {
        const response = await fetch('https://jobtracker-l44k.onrender.com/send-form-data', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            dateCommission: formattedDate,
            employeeName: selectedEmployeeName,
            station: selectedStationName,
            remarks: commissionRemarks,
          }),
        });

        if (!response.ok) {
          throw new Error('Ошибка при добавлении данных в Google Sheets');
        }

        console.log('Данные успешно добавлены в Google Sheets');
      })
      .catch((err: Error) => {
        console.log('Ошибка при отправке данных:', err.message);
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
