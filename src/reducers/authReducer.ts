import { GET_AUTHSTATE, LOG_OUT } from '../actions/actionTypes';
import { UserRole } from '../Enums';

export interface LoginState {
    isAuthenticated: boolean,
    userRole?: UserRole,
    name?: string,
    loading: true
  }

const initialState: LoginState = {
    isAuthenticated: false,
    loading: true
}

export const authReducer = (state = initialState, action ) => {
  switch(action.type) {
    case GET_AUTHSTATE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        loading: false
      };
    case LOG_OUT:
      return {
        isAuthenticated: false,
        loading: true
      };
    default: 
      return state;
    }
}