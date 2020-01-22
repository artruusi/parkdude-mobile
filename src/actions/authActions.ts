import {GET_AUTHSTATE, LOG_OUT} from './actionTypes';
import {
  LOGIN_STATE_URL, LOGOUT_URL, PASSWORD_LOGIN_URL, SIGNUP_URL,
  PASSWORD_CHANGE_URL} from 'react-native-dotenv';
import {gotNetworkError, clearErrorState, setPasswordLoginError,
  setSignupError, setChangePasswordError} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch} from '../Utils';
import {removeCookie, setCookie} from '../CookieStorage';
import {HttpMethod, LoadingType} from '../types';
import {setLoadingState, removeLoadingState} from './loadingActions';

export const getAuthState = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.AUTH));
      const authResponse = await apiFetch(LOGIN_STATE_URL, {method: HttpMethod.GET});
      const result = await authResponse.json();
      dispatch(clearErrorState());
      dispatch(setAuthState(result));
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.AUTH));
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
      await apiFetch(LOGOUT_URL, {method: HttpMethod.POST});
      await removeCookie();
      dispatch(clearErrorState());
      dispatch(setLogOutState());
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
  };
};

export const loginWithPassword = (email: string, password: string) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.PASSWORD_LOGIN));
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
          await getAuthState()(dispatch);
        }
      } else {
        const result = await loginResponse.json();
        dispatch(setPasswordLoginError(result.message));
      }
    } catch (error) {
      dispatch(setPasswordLoginError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.PASSWORD_LOGIN));
  };
};

export const signup = (email: string, name: string, password: string) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.SIGNUP));
      const signUpResponse = await apiFetch(SIGNUP_URL, {
        method: HttpMethod.POST,
        body: JSON.stringify({email, password, name}),
        headers: {'Content-Type': 'application/json'}
      });
      const result = await signUpResponse.json();
      if (signUpResponse.status === 200) {
        await loginWithPassword(email, password)(dispatch);
      } else {
        dispatch(setSignupError(result.message));
      }
    } catch (error) {
      dispatch(setSignupError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.SIGNUP));
  };
};

export const changePassword = (oldPassword: string, newPassword: string) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.CHANGE_PASSWORD));
      const changePasswordResponse = await apiFetch(PASSWORD_CHANGE_URL, {
        method: HttpMethod.PUT,
        body: JSON.stringify({password: newPassword, oldPassword}),
        headers: {'Content-Type': 'application/json'}
      });
      const result = await changePasswordResponse.json();
      if (changePasswordResponse.status === 200) {
        dispatch(removeLoadingState(LoadingType.CHANGE_PASSWORD));
        return true;
      } else {
        dispatch(setChangePasswordError(result.message));
      }
    } catch (error) {
      dispatch(setChangePasswordError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.CHANGE_PASSWORD));
    return false;
  };
};

export const setLogOutState = () => {
  return {
    type: LOG_OUT
  };
};

// This is not an action creator, but if this in put on Utils.ts, Expo will create
// a new  unnecessary error about "Require cycle"
export async function verifiedUser(statusCode: number, dispatch: any) {
  if (statusCode === 401) {
    await logOut()(dispatch);
    return false;
  }
  return true;
}
