import {CALENDAR_URL} from 'react-native-dotenv';
import {apiFetch, getMonthRangeForURL} from '../Utils';
import {HttpMethod, LoadingType, CalendarReservations} from '../types';
import {gotNetworkError, clearErrorState, generalError} from './errorActions';
import {CONNECTION_ERROR, GENERAL_ERROR_MESSAGE} from '../Constants';
import {GET_CALENDAR_DATA} from './actionTypes';
import {setLoadingState, removeLoadingState} from './loadingActions';
import {verifiedUser} from './authActions';
import {Dispatch} from 'redux';

// Could also be stored in Redux, but kept here for simplicity
// Note: could cause issues if there are multiple stores with independent states
let latestCalendarQuery = '';

export const getCalendarSpots = (year: number, month: number) => {
  return async (dispatch: Dispatch) => {
    const urlQuery = getMonthRangeForURL(year, month);
    latestCalendarQuery = urlQuery;
    try {
      dispatch(clearErrorState());
      dispatch(setLoadingState(LoadingType.GET_MONTH));
      const url = `${CALENDAR_URL}${urlQuery}`;
      const response = await apiFetch(url, {method: HttpMethod.GET});
      if (latestCalendarQuery !== urlQuery) {
        // Newer request has been made, so this should be ignored
        return;
      }
      if (await verifiedUser(response.status, dispatch)) {
        if (response.status === 200) {
          const result = await response.json();
          dispatch(setCalendarState(result));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(generalError(GENERAL_ERROR_MESSAGE));
        }
      }
    } catch (error) {
      if (latestCalendarQuery !== urlQuery) {
        // Newer request has been made, so this should be ignored
        return;
      }
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.GET_MONTH));
    // eslint-disable-next-line require-atomic-updates
    latestCalendarQuery = '';
  };
};

export const setCalendarState = (state: CalendarReservations) => {
  // Filter permanent spots out from own reservations
  const ownedSpotsIDs = state.ownedSpots.map((r) => r.id);
  state.calendar.forEach((entry) => {
    entry.spacesReservedByUser = entry.spacesReservedByUser.filter((r) =>
      !ownedSpotsIDs.includes(r.id));
  });
  return {
    type: GET_CALENDAR_DATA,
    payload: state
  };
};
