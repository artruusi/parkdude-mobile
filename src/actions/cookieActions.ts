import {HAS_COOKIES} from './actionTypes';


export const setHasCookies = (hasCookies: boolean) => {
  console.log(hasCookies);
  return {
    type: HAS_COOKIES,
    payload: hasCookies
  };
};
