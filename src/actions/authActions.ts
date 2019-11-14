import {GET_AUTHSTATE, LOG_OUT, SIMULATED_LOGIN_VERIFIED, SIMULATED_LOGIN_UNVERIFIED} from './actionTypes';
import {LOGIN_STATE_URL, LOGOUT_URL} from 'react-native-dotenv';
import {gotNetworkError} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch} from '../Utils';
import {removeCookie} from '../CookieStorage';
import {HttpMethod} from '../types';


export const setSimulatedAuthState = () => {
  return async (dispatch) => {
    try {
      dispatch(setAuthState({
        isAuthenticated: false
      }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSimulateVerified = () => {
  return async (dispatch) => {
    try {
      dispatch(setAuthState({type: SIMULATED_LOGIN_VERIFIED}));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSimulateUnVerified = () => {
  return async (dispatch) => {
    try {
      dispatch(setAuthState({type: SIMULATED_LOGIN_UNVERIFIED}));
    } catch (error) {
      console.log(error);
    }
  };
};

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

export const simulateLogout = () => {
  return async (dispatch) => {
    try {
      dispatch(setLogOutState(''));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setLogOutState = (result) => {
  return {
    type: LOG_OUT,
    payload: result
  };
};
