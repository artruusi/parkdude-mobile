import {GET_AUTHSTATE, LOG_OUT} from './actionTypes';
import {
  LOGIN_STATE_URL, LOGOUT_URL, PASSWORD_LOGIN_URL, SIGNUP_URL
} from 'react-native-dotenv';
import {gotNetworkError, clearErrorState, setPasswordLoginError, setSignupError} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch} from '../Utils';
import {removeCookie, setCookie} from '../CookieStorage';
import {HttpMethod} from '../types';

export const getAuthState = () => {
  return async (dispatch) => {
    try {
      const authResponse = await apiFetch(LOGIN_STATE_URL, {method: HttpMethod.GET});
      const result = await authResponse.json();
      dispatch(clearErrorState());
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
      dispatch(clearErrorState());

export const loginWithPassword= (email: string, password: string) => {
  return async (dispatch) => {
    try {
      const loginResponse = await apiFetch(PASSWORD_LOGIN_URL, {
        method: HttpMethod.POST,
        body: JSON.stringify({email, password}),
        // Empty cookie to ensure that new cookie is given in headers
        headers: {'Content-Type': 'application/json', 'cookie': ''}
      });
      if (loginResponse.status === 200) {
        const cookie = loginResponse.headers.get('set-cookie');
        if (cookie) {
          const sessionId = cookie.split('sessionId=')[1].split(';')[0];
          await setCookie(`sessionId=${sessionId}`);
          getAuthState()(dispatch);
        } else {
          const result = await loginResponse.json();
          dispatch(setPasswordLoginError(result.message));
        }
      }
    } catch (error) {
      dispatch(setPasswordLoginError(CONNECTION_ERROR));
    }
  };
};

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
