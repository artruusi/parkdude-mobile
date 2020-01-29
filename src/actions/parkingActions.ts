import {MY_PARKINGS, GET_PARKING_SPOTS} from './actionTypes';
import {GET_OWN_RESERVATIONS, GET_PARKING_SPOTS_URL} from 'react-native-dotenv';
import {gotNetworkError, clearErrorState} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch, toDateString} from '../Utils';
import {HttpMethod, LoadingType} from '../types';
import {setLoadingState, removeLoadingState} from './loadingActions';
import {verifiedUser} from './authActions';

export const getParkingSpots = (dates: string[]) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.GET_PARKING_SPOTS));
      const url = `${GET_PARKING_SPOTS_URL}?availableOnDates=${dates.join(',')}`;
      const response = await apiFetch(url, {method: HttpMethod.GET});
      if (await verifiedUser(response.status, dispatch)) {
        const result = await response.json();
        dispatch(clearErrorState());
        dispatch(setParkingSpots(result.data));
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.GET_PARKING_SPOTS));
  };
};

export const setParkingSpots = (result) => {
  return {
    type: GET_PARKING_SPOTS,
    payload: result
  };
};

export const getMyParkings = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.GET_RESERVATIONS));
      const date = new Date();
      date.setFullYear(date.getFullYear()+1);
      const endDate = toDateString(date);
      const url = `${GET_OWN_RESERVATIONS}?endDate=${endDate}`;
      const response = await apiFetch(url, {method: HttpMethod.GET});
      if (await verifiedUser(response.status, dispatch)) {
        const result = await response.json();
        dispatch(clearErrorState());
        dispatch(setMyParkings(result));
      }
    } catch (error) {
      console.log(error);
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.GET_RESERVATIONS));
  };
};

export const setMyParkings = (result) => {
  return {
    type: MY_PARKINGS,
    payload: result
  };
};
