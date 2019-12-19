import {CALENDAR_URL} from 'react-native-dotenv';
import {apiFetch} from '../Utils';
import {HttpMethod} from '../types';
import {gotNetworkError, clearErrorState} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {GET_CALENDAR_DATA} from './actionTypes';

export const getCalendarSpots = (dateRangeParams: string) => {
  return async (dispatch) => {
    try {
      const calendarResponse = await apiFetch(CALENDAR_URL + dateRangeParams, {method: HttpMethod.GET});
      const result = await calendarResponse.json();
      dispatch(clearErrorState());
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
