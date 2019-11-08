import {GET_AUTHSTATE, LOG_OUT} from './actionTypes';
import {LOGIN_STATE_URL, LOGOUT_URL} from 'react-native-dotenv';
import {gotNetworkError} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch} from '../Utils';
import {removeCookie} from '../CookieStorage';
import {HttpMethod} from '../types';

// url for mocking request
// "https://jsonplaceholder.typicode.com/todos/1"

export const getAuthState = () => {
  return async (dispatch) => {
    try {
      const authResponse = await apiFetch(LOGIN_STATE_URL, {method: HttpMethod.GET});
      const result = await authResponse.json();
      dispatch(setAuthState(result));
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
  };
};

export const setAuthState = (result) => {
  return {
    type: GET_AUTHSTATE,
    payload: result
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      const authResponse = await apiFetch(LOGOUT_URL, {method: HttpMethod.POST});
      const result = await authResponse.json();
      await removeCookie();
      dispatch(setLogOutState(result));
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
  };
};

export const setLogOutState = (result) => {
  return {
    type: LOG_OUT,
    payload: result
  };
};