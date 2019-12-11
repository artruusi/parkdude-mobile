import {GET_CALENDAR_DATA, MY_PARKINGS, SIMULATE, GET_PARKING_SPOTS} from './actionTypes';
import {GET_OWN_RESERVATIONS, GET_PARKING_SPOTS_URL} from 'react-native-dotenv';
import {gotNetworkError, clearErrorState} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch, toDateString} from '../Utils';
import {HttpMethod} from '../types';

export const getParkingSpots = () => {
  return async (dispatch) => {
    try {
      const getSpotsResponse = await apiFetch(GET_PARKING_SPOTS_URL, {method: HttpMethod.GET});
      const result = await getSpotsResponse.json();
      dispatch(clearErrorState());
      // console.log(result);
      dispatch(setParkingSpots(result.data));
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
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
      const date = new Date();
      date.setFullYear(date.getFullYear()+1);
      const endDate = toDateString(date);
      const url = `${GET_OWN_RESERVATIONS}?endDate=${endDate}`;
      const getMyParkingsResponse = await apiFetch(url, {method: HttpMethod.GET});
      const result = await getMyParkingsResponse.json();
      // console.log(result);
      dispatch(clearErrorState());
      dispatch(setMyParkings(result));
    } catch (error) {
      console.log(error);
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
  };
};

export const setMyParkings = (result) => {
  return {
    type: MY_PARKINGS,
    payload: result
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

