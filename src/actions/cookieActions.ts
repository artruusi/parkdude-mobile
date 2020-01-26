import {SET_HAS_COOKIES} from './actionTypes';


export const setHasCookies = (hasCookies: boolean) => {
  return {
    type: SET_HAS_COOKIES,
    payload: hasCookies
  };
};
