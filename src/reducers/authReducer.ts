import {GET_AUTHSTATE, LOG_OUT} from '../actions/actionTypes';
import {UserRole} from '../Enums';

export interface LoginState {
  isAuthenticated: boolean,
  userRole?: UserRole,
  name?: string,
  loading: true
};

const initialState: LoginState = {
  isAuthenticated: false,
  loading: true
};

export const authReducer = (state = initialState, action ) => {
  switch(action.type) {
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
        loading: false
      };
    default:
      return state;
    }
}