import {
  NETWORK_ERROR, RESERVATION_FAILED, CLEAR_ERRORS,
  GENERAL_ERROR, PASSWORD_LOGIN_ERROR, SIGNUP_ERROR
} from '../actions/actionTypes';
import {ErrorState} from '../types';

const initialState: ErrorState = {
  generalError: '',
  networkError: '',
  postReservationError: {message: '', dates: []},
  passwordLoginError: '',
  signupError: ''
};

export const errorReducer = (state = initialState, action ) => {
  switch (action.type) {
  case GENERAL_ERROR:
    return {
      ...state,
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
      postReservationError: {
        message: action.payload.message,
        dates: action.payload.errorDates
      }
    };
  case PASSWORD_LOGIN_ERROR:
    return {
      ...state,
      passwordLoginError: action.payload
    };
  case SIGNUP_ERROR:
    return {
      ...state,
      signupError: action.payload
    };
  case CLEAR_ERRORS:
    return initialState;
  default:
    return state;
  }
};
