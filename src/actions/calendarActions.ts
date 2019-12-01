import {CALENDAR_URL} from 'react-native-dotenv';
import {apiFetch} from '../Utils';
import {HttpMethod} from '../types';
import {gotNetworkError, clearErrorState} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {GET_CALENDAR_DATA} from './actionTypes';

export const getCalendarSpots = (dateRangeParams: string) => {
  return async (dispatch) => {
    try {
      // const calendarResponse = await apiFetch(CALENDAR_URL + dateRangeParams, {method: HttpMethod.GET});
      // const result = await calendarResponse.json();
      const result = calendarTestData;
      // dispatch(clearErrorState());
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


// TEST DATA

const calendarTestData = {
  calendar: [
    {
      date: '2019-11-27',
      spacesReservedByUser: [{
        id: '123-id',
        name: '315'
      }],
      availableSpaces: 6
    },
    {
      date: '2019-11-28',
      spacesReservedByUser: [],
      availableSpaces: 0
    },
    {
      date: '2019-11-29',
      spacesReservedByUser: [],
      availableSpaces: 3
    },
    {
      date: '2019-12-11',
      spacesReservedByUser: [],
      availableSpaces: 0
    },
    {
      date: '2019-12-12',
      spacesReservedByUser: [],
      availableSpaces: 0
    },
    {
      date: '2019-12-13',
      spacesReservedByUser: [],
      availableSpaces: 0
    },
    {
      date: '2019-12-18',
      spacesReservedByUser: [{
        id: '123-id',
        name: '315'
      }],
      availableSpaces: 6
    },
    {
      date: '2019-12-19',
      spacesReservedByUser: [{
        id: '123-id',
        name: '315'
      }],
      availableSpaces: 0
    },
    {
      date: '2019-12-20',
      spacesReservedByUser: [{
        id: '123-id',
        name: '315'
      }],
      availableSpaces: 3
    },
  ],
  ownedSpots: []
};
