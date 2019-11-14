import * as authActions from '../../src/actions/authActions';
import * as errorActions from '../../src/actions/errorActions';
import * as parkingActions from '../../src/actions/parkingActions';
import * as types from '../../src/actions/actionTypes';

describe('Action Creators', () => {
  it('should create GET_AUTHSTATE action', () => {
    const mockPayload = {};
    const expectedAction = {
      type: types.GET_AUTHSTATE,
      payload: mockPayload
    };
    expect(authActions.setAuthState(mockPayload)).toEqual(expectedAction);
  });

  it('should create GET_LOGOUT action', () => {
    const mockPayload = {};
    const expectedAction = {
      type: types.LOG_OUT,
      payload: mockPayload
    };
    expect(authActions.setLogOutState(mockPayload)).toEqual(expectedAction);
  });

  it('should create MY_PARKINGS action', () => {
    const expectedAction = {
      type: types.MY_PARKINGS
    };
    expect(parkingActions.setMyParkings()).toEqual(expectedAction);
  });

  it('should create NETWORK_ERROR action', () => {
    const mockPayload = 'errorString';
    const expectedAction = {
      type: types.NETWORK_ERROR,
      payload: mockPayload
    };
    expect(errorActions.gotNetworkError(mockPayload)).toEqual(expectedAction);
  });
});
