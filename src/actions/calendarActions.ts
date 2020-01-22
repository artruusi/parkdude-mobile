import {CALENDAR_URL} from 'react-native-dotenv';
import {apiFetch} from '../Utils';
import {HttpMethod, LoadingType} from '../types';
import {gotNetworkError, clearErrorState, generalError} from './errorActions';
import {CONNECTION_ERROR, GENERAL_ERROR_MESSAGE} from '../Constants';
import {GET_CALENDAR_DATA} from './actionTypes';
import {setLoadingState, removeLoadingState} from './loadingActions';
import {verifiedUser} from './authActions';

export const getCalendarSpots = (dateRangeParams: string) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.GET_MONTH));
      const url = `${CALENDAR_URL}${dateRangeParams}`;
      const response = await apiFetch(url, {method: HttpMethod.GET});
      if (await verifiedUser(response.status, dispatch)) {
        if (response.status === 200) {
          const result = await response.json();
          dispatch(clearErrorState());
          dispatch(setCalendarState(result));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(generalError(GENERAL_ERROR_MESSAGE));
        }
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
