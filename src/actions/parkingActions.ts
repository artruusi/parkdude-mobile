import {GET_CALENDAR_DATA, MY_PARKINGS, SIMULATE} from './actionTypes';
import {CALENDAR_URL} from 'react-native-dotenv';
import {gotNetworkError} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch} from '../Utils';
import {HttpMethod} from '../types';


export const getMyParkings = () => {
  return async (dispatch) => {
    try {
      dispatch(setMyParkings());
    } catch (error) {
      console.log(error);
    }
  };
};

export const setMyParkings = () => {
  return {
    type: MY_PARKINGS
  };
};

export const simulateGetMyParkings = () => {
  return async (dispatch) => {
    try {
      dispatch({type: SIMULATE});
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCalendarSpots = () => {
  return async (dispatch) => {
    try {
      const calendarResponse = await apiFetch(CALENDAR_URL +
        '?startDate=2019-11-01&endDate=2019-11-30', {method: HttpMethod.GET});
      const result = await calendarResponse.json();
      dispatch(setCalendarState(result));
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
  };
};

export const setCalendarState = (result) => {
  return {
    type: GET_CALENDAR_DATA,
    payload: result
  };
};
