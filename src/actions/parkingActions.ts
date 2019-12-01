import {GET_CALENDAR_DATA, MY_PARKINGS, SIMULATE, GET_PARKING_SPOTS} from './actionTypes';
import {CALENDAR_URL, GET_PARKING_SPOTS_URL} from 'react-native-dotenv';
import {gotNetworkError, clearErrorState} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch} from '../Utils';
import {HttpMethod} from '../types';

export const getParkingSpots = () => {
  return async (dispatch) => {
    try {
      // const getSpotsResponse = await apiFetch(GET_PARKING_SPOTS_URL, {method: HttpMethod.GET});
      // const result = await getSpotsResponse.json();
      // dispatch(clearErrorState());
      // dispatch(setParkingSPots(result));
      dispatch(setParkingSpots([])); // mock
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

