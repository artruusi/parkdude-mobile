import {CALENDAR_URL} from 'react-native-dotenv';
import {apiFetch} from '../Utils';
import {HttpMethod, LoadingType} from '../types';
import {gotNetworkError, clearErrorState} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {GET_CALENDAR_DATA} from './actionTypes';
import {setLoadingState, removeLoadingState} from './loadingActions';

export const getCalendarSpots = (dateRangeParams: string) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.GET_MONTH));
      const url = `${CALENDAR_URL}${dateRangeParams}`;
      const calendarResponse = await apiFetch(url, {method: HttpMethod.GET});
      if (calendarResponse.status === 200) {
        const result = await calendarResponse.json();
        dispatch(clearErrorState());
        dispatch(setCalendarState(result));
      } else {
        // TODO: Better error handling
        throw new Error();
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.GET_MONTH));
  };
};

export const setCalendarState = (result) => {
  // Filter permanent spots out from own reservations
  const ownedSpotsIDs = result.ownedSpots.map((r) => r.id);
  result.calendar.forEach((entry) => {
    entry.spacesReservedByUser = entry.spacesReservedByUser.filter((r) =>
      !ownedSpotsIDs.includes(r.id));
  });
  return {
    type: GET_CALENDAR_DATA,
    payload: result
  };
};
