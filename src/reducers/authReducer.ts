import {GET_AUTHSTATE, LOG_OUT} from '../actions/actionTypes';
import {LoginState, UserRole} from '../types';

const initialState: LoginState = {
  isAuthenticated: false,
  loading: true
};

export const authReducer = (state = initialState, action ) => {
  switch (action.type) {
  case GET_AUTHSTATE:
    return {
      isAuthenticated: action.payload.isAuthenticated,
      userRole: action.payload.userRole,
      name: action.payload.name,
      loading: false
    };
  case LOG_OUT:
    return {
      isAuthenticated: false,
      userRole: null,
      name: null,
      loading: true
    };
  default:
    return state;
  }
};
