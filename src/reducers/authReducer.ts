import {GET_AUTHSTATE, LOG_OUT, SIMULATED_LOGIN_VERIFIED, SIMULATED_LOGIN_UNVERIFIED} from '../actions/actionTypes';
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
  case SIMULATED_LOGIN_VERIFIED:
    return {
      isAuthenticated: true,
      userRole: UserRole.VERIFIED,
      name: 'Verified Simulated user',
      loading: false
    };
  case SIMULATED_LOGIN_UNVERIFIED:
    return {
      isAuthenticated: true,
      userRole: UserRole.UNVERIFIED,
      name: 'Unverified Simulated user',
      loading: false
    };
  default:
    return state;
  }
};
