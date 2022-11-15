import {
  DISABLE_BALANCE_ADD,
  DISABLE_BALANCE_EDIT,
  ALLOW_REGISTRATION,
} from '../actions/actionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ADD:
      return {
        ...state,
        disableBalanceOnAdd: action.payload,
      };
    case DISABLE_BALANCE_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload,
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        onAllowRegistration: action.payload,
      };

    default:
      return state;
  }
}
