import {
  DISABLE_BALANCE_ADD,
  DISABLE_BALANCE_EDIT,
  ALLOW_REGISTRATION,
} from './actionTypes';

export const setDisableBalanceonAdd = () => {
  // get from LS
  const settings = JSON.parse(localStorage.getItem('settings'));
  // Toggle
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;
  // send it back to LS
  localStorage.setItem('settings', JSON.stringify(settings));

  return { type: DISABLE_BALANCE_ADD, payload: settings.disableBalanceOnAdd };
};

export const setDisableBalanceonEdit = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;
  localStorage.setItem('settings', JSON.stringify(settings));

  return { type: DISABLE_BALANCE_EDIT, payload: settings.disableBalanceOnEdit };
};

export const setAllowRegistration = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));
  settings.onAllowRegistration = !settings.onAllowRegistration;
  localStorage.setItem('settings', JSON.stringify(settings));

  return { type: ALLOW_REGISTRATION, payload: settings.onAllowRegistration };
};
