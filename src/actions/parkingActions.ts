import {MY_PARKINGS, SIMULATE} from './actionTypes';


export const getMyParkings = () => {
  return async (dispatch) => {
    try {
      dispatch({type: MY_PARKINGS});
    } catch (error) {
      console.log(error);
    }
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
