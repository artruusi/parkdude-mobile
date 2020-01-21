import {HAS_COOKIES} from '../actions/actionTypes';
import {CookieState} from '../types';

const initialState: CookieState = {
  hasCookies: false
};

export const cookieReducer = (state = initialState, action ) => {
  switch (action.type) {
  case HAS_COOKIES:
    return {
      hasCookies: action.payload
    };
  default:
    return state;
  }
};
