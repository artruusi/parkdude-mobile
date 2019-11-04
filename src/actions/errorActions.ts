import {NETWORK_ERROR} from './actionTypes';

export const gotNetworkError = (errorString) => {
  return {
    type: NETWORK_ERROR,
    payload: errorString
  };
};
