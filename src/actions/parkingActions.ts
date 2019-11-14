import {MY_PARKINGS, SIMULATE} from './actionTypes';


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
