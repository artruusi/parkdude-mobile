import {authReducer} from '../../src/reducers/authReducer';
import {GET_AUTHSTATE, LOG_OUT} from '../../src/actions/actionTypes';
import {UserRole} from '../../src/Enums';

const serverResultAuthenticated = {
  isAuthenticated: true,
  userRole: UserRole.VERIFIED,
  name: 'testUser'
};

const serverResultUnAuthenticated = {
  isAuthenticated: false,
  userRole: UserRole.UNVERIFIED,
  name: undefined
};

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      userRole: undefined,
      name: undefined,
      loading: true
    });
  });

  it('should authenticate', () => {
    expect(authReducer(undefined, {
      type: GET_AUTHSTATE,
      payload: serverResultAuthenticated
    })).toEqual({
      isAuthenticated: true,
      userRole: UserRole.VERIFIED,
      name: 'testUser',
      loading: false
    });
  });

  it('should not authenticate', () => {
    expect(authReducer(undefined, {
      type: GET_AUTHSTATE,
      payload: serverResultUnAuthenticated
    })).toEqual({
      isAuthenticated: false,
      userRole: UserRole.UNVERIFIED,
      name: undefined,
      loading: false
    });
  });

  it('should log out succesfully', () => {
    expect(authReducer(undefined, {
      type: LOG_OUT,
      payload: {}
    })).toEqual({
      isAuthenticated: false,
      userRole: null,
      name: null,
      loading: false
    });
  });
});
