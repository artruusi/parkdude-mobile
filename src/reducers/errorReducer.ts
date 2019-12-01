import {NETWORK_ERROR, RESERVATION_FAILED, CLEAR_ERRORS} from '../actions/actionTypes';
import {ErrorState} from '../types';
import {reservationFailed} from '../actions/errorActions';

const initialState: ErrorState = {
  networkError: '',
  postReservationError: {message: '', dates: []}
};

export const errorReducer = (state = initialState, action ) => {
  switch (action.type) {
  case NETWORK_ERROR:
    return {
      ...state,
      networkError: action.payload
    };
  case RESERVATION_FAILED:
    return {
      ...state,
      postReservationError: {
        message: action.payload.message,
        dates: action.payload.errorDates
      }
    };
  case CLEAR_ERRORS:
    return initialState;
  default:
    return state;
  }
};
