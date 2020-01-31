import {loadingReducer} from '../../src/reducers/loadingReducer';
import {SET_LOADING_STATE, REMOVE_LOADING_STATE} from '../../src/actions/actionTypes';
import {LoadingType} from '../../src/types';

describe('loadingReducer', () => {
  it('should set loading state', () => {
    const loadingType = LoadingType.GET_MONTH;
    expect(loadingReducer(undefined, {
      type: SET_LOADING_STATE,
      payload: loadingType
    })).toEqual({
      signUpLoading: false,
      passwordLoginLoading: false,
      getMonthLoading: true,
      getReservationsLoading: false,
      getParkingSpotsLoading: false,
      reserveSpotsLoading: false,
      newReleaseLoading: false,
      deleteReservationLoading: false,
      deleteReleaseLoading: false,
      changePasswordLoading: false,
      authLoading: false
    });
  });

  it('should remove loading state', () => {
    const loadingType = LoadingType.GET_MONTH;
    expect(loadingReducer({
      signUpLoading: false,
      passwordLoginLoading: false,
      getMonthLoading: true,
      getReservationsLoading: true,
      getParkingSpotsLoading: false,
      reserveSpotsLoading: false,
      newReleaseLoading: false,
      deleteReservationLoading: false,
      deleteReleaseLoading: false,
      authLoading: false
    }, {
      type: REMOVE_LOADING_STATE,
      payload: loadingType
    })).toEqual({
      signUpLoading: false,
      passwordLoginLoading: false,
      getMonthLoading: false,
      getReservationsLoading: true,
      getParkingSpotsLoading: false,
      reserveSpotsLoading: false,
      newReleaseLoading: false,
      deleteReservationLoading: false,
      deleteReleaseLoading: false,
      authLoading: false
    });
  });
});
