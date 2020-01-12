import {SET_LOADING_STATE, REMOVE_LOADING_STATE} from './actionTypes';
import {LoadingType} from '../types';

export const setLoadingState = (loadingType: LoadingType) => {
  return {
    type: SET_LOADING_STATE,
    payload: loadingType
  };
};

export const removeLoadingState = (loadingType: LoadingType) => {
  return {
    type: REMOVE_LOADING_STATE,
    payload: loadingType
  };
};
