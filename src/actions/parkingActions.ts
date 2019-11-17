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

