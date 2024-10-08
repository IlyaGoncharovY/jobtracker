import {useState} from 'react';

import {Nullable} from '../types';

/**
 * Хук для отправки данных с форм.
 * @returns {Object} Объект, содержащий состояния и функции для работы с данными форм.
 * @returns {Nullable<string>} commissionEmployee - Сотрудник, принимавший участие в комиссии.
 * @returns {(value: Nullable<string>) => void} setCommissionEmployee - Функция для установки сотрудника комиссии.
 * @returns {Nullable<string>} commissionStation - Станция, на которой проходила комиссия.
 * @returns {(value: Nullable<string>) => void} setCommissionStation - Функция для установки станции комиссии.
 * @returns {Nullable<string>} commissionDate - Дата проведения комиссии.
 * @returns {(value: Nullable<string>) => void} setCommissionDate - Функция для установки даты комиссии.
 * @returns {string} commissionRemarks - Замечания, полученные на комиссии.
 * @returns {(value: string) => void} setCommissionRemarks - Функция для установки замечаний комиссии.
 * @returns {Nullable<string>} radioStation - Станция, на которой установлена радиостанция.
 * @returns {(value: Nullable<string>) => void} setRadioStation - Функция для установки станции радиостанции.
 * @returns {Nullable<string>} radioDate - Дата проверки радиостанции.
 * @returns {(value: Nullable<string>) => void} setRadioDate - Функция для установки даты проверки радиостанции.
 * @returns {string} radioSerialNumber - Серийный номер радиостанции.
 * @returns {(value: string) => void} setRadioSerialNumber - Функция для установки серийного номера радиостанции.
 */
export const useSendDataForm = () => {
  // Состояния для CommissionMode
  const [commissionEmployee, setCommissionEmployee] = useState<Nullable<string>>(null);
  const [commissionStation, setCommissionStation] = useState<Nullable<string>>(null);
  const [commissionDate, setCommissionDate] = useState<Nullable<string>>(null);
  const [commissionRemarks, setCommissionRemarks] = useState<string>('');

  // Состояния для RadioStationMode
  const [radioStation, setRadioStation] = useState<Nullable<string>>(null);
  const [radioDate, setRadioDate] = useState<Nullable<string>>(null);
  const [radioSerialNumber, setRadioSerialNumber] = useState<string>('');

  return {
    commissionEmployee,
    setCommissionEmployee,
    commissionStation,
    setCommissionStation,
    commissionDate,
    setCommissionDate,
    commissionRemarks,
    setCommissionRemarks,
    radioStation,
    setRadioStation,
    radioDate,
    setRadioDate,
    radioSerialNumber,
    setRadioSerialNumber,
  };
};
