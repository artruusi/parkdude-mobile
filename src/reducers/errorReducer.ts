import {
  NETWORK_ERROR, RESERVATION_FAILED, CLEAR_ERRORS,
  GENERAL_ERROR, PASSWORD_LOGIN_ERROR, SIGNUP_ERROR, DELETE_RESERVATION_FAILED
} from '../actions/actionTypes';
import {ErrorState} from '../types';

const initialState: ErrorState = {
  generalError: '',
  networkError: '',
  postReservationError: {message: '', dates: []},
  passwordLoginError: '',
  signupError: '',
  deleteReservationError: {message: '', dates: []}
};

export const errorReducer = (state = initialState, action ) => {
  switch (action.type) {
  case GENERAL_ERROR:
    return {
      ...state,
      networkError: '',
      generalError: action.payload
    };
  case NETWORK_ERROR:
    return {
      ...state,
      networkError: action.payload
    };
  case RESERVATION_FAILED:
    return {
      ...state,
      networkError: '',
      postReservationError: {
        message: action.payload.message,
        dates: action.payload.errorDates
      }
    };
  case PASSWORD_LOGIN_ERROR:
    return {
      ...state,
      networkError: '',
      passwordLoginError: action.payload
    };
  case SIGNUP_ERROR:
    return {
      ...state,
      networkError: '',
      signupError: action.payload
    };
  case DELETE_RESERVATION_FAILED:
    return {
      ...state,
      networkError: '',
      deleteReservationError: {
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
