import {NETWORK_ERROR, RESERVATION_FAILED, CLEAR_ERRORS} from './actionTypes';

export const gotNetworkError = (errorString) => {
  return {
    type: NETWORK_ERROR,
    payload: errorString
  };
};

export const reservationFailed = (result) => {
  return {
    type: RESERVATION_FAILED,
    payload: result
  };
};

export const clearErrorState = () => {
  return {
    type: CLEAR_ERRORS
  };
};
