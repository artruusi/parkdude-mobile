import * as authActions from '../../src/actions/authActions';
import * as errorActions from '../../src/actions/errorActions';
import * as parkingActions from '../../src/actions/parkingActions';
import * as calendarActions from '../../src/actions/calendarActions';
import * as reservationActions from '../../src/actions/reservationActions';
import * as types from '../../src/actions/actionTypes';
import {LoadingType} from '../../src/types';
import {setLoadingState, removeLoadingState} from '../../src/actions/loadingActions';

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
    const expectedAction = {
      type: types.LOG_OUT
    };
    expect(authActions.setLogOutState()).toEqual(expectedAction);
  });

  it('should create GET_CALENDAR_DATA action', () => {
    const mockPayload = {calendar: [], ownedSpots: []};
    const expectedAction = {
      type: types.GET_CALENDAR_DATA,
      payload: mockPayload
    };
    expect(calendarActions.setCalendarState(mockPayload)).toEqual(expectedAction);
  });

  it('should create MY_PARKINGS action', () => {
    const expectedAction = {
      type: types.MY_PARKINGS
    };
    expect(parkingActions.setMyParkings()).toEqual(expectedAction);
  });

  it('should create RESERVE_SPOTS action', () => {
    const mockPayload = {};
    const expectedAction = {
      type: types.RESERVE_SPOTS,
      payload: mockPayload
    };
    expect(reservationActions.createPostReservationAction(mockPayload)).toEqual(expectedAction);
  });

  it('should create GENERAL_ERROR action', () => {
    const mockPayload = 'errorString';
    const expectedAction = {
      type: types.GENERAL_ERROR,
      payload: mockPayload
    };
    expect(errorActions.generalError(mockPayload)).toEqual(expectedAction);
  });

  it('should create NETWORK_ERROR action', () => {
    const mockPayload = 'errorString';
    const expectedAction = {
      type: types.NETWORK_ERROR,
      payload: mockPayload
    };
    expect(errorActions.gotNetworkError(mockPayload)).toEqual(expectedAction);
  });

  it('should create RESERVATION_FAILED action', () => {
    const mockPayload = {
      message: 'Reservation failed. There weren\'t available spots for some of the days.',
      errorDates: ['2019-12-24']
    };
    const expectedAction = {
      type: types.RESERVATION_FAILED,
      payload: mockPayload
    };
    expect(errorActions.reservationFailed(mockPayload)).toEqual(expectedAction);
  });

  it('should create PASSWORD_LOGIN_ERROR action', () => {
    const mockPayload = 'errorString';
    const expectedAction = {
      type: types.PASSWORD_LOGIN_ERROR,
      payload: mockPayload
    };
    expect(errorActions.setPasswordLoginError(mockPayload)).toEqual(expectedAction);
  });

  it('should create SIGNUP_ERROR action', () => {
    const mockPayload = 'errorString';
    const expectedAction = {
      type: types.SIGNUP_ERROR,
      payload: mockPayload
    };
    expect(errorActions.setSignupError(mockPayload)).toEqual(expectedAction);
  });

  it('should create CHANGE_PASSWORD_ERROR action', () => {
    const mockPayload = 'errorString';
    const expectedAction = {
      type: types.CHANGE_PASSWORD_ERROR,
      payload: mockPayload
    };
    expect(errorActions.setChangePasswordError(mockPayload)).toEqual(expectedAction);
  });

  it('should create CLEAR_ERRORS action', () => {
    const expectedAction = {
      type: types.CLEAR_ERRORS
    };
    expect(errorActions.clearErrorState()).toEqual(expectedAction);
  });

  it('should create SET_LOADING_STATE action', () => {
    const mockPayload = LoadingType.GET_MONTH;
    const expectedAction = {
      type: types.SET_LOADING_STATE,
      payload: mockPayload
    };
    expect(setLoadingState(mockPayload)).toEqual(expectedAction);
  });

  it('should create REMOVE_LOADING_STATE action', () => {
    const mockPayload = LoadingType.GET_MONTH;
    const expectedAction = {
      type: types.REMOVE_LOADING_STATE,
      payload: mockPayload
    };
    expect(removeLoadingState(mockPayload)).toEqual(expectedAction);
  });
});
