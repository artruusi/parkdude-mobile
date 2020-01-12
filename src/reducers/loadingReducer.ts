import {LoadingState} from '../types';
import {SET_LOADING_STATE, REMOVE_LOADING_STATE} from '../actions/actionTypes';
import {setLoadingState, removeLoadingState} from '../actions/loadingActions';

const initialState: LoadingState = {
  signUpLoading: false,
  passwordLoginLoading: false,
  getMonthLoading: false,
  getReservationsLoading: false,
  getParkingSpotsLoading: false,
  reserveSpotsLoading: false
};

type Action = ReturnType<typeof setLoadingState|typeof removeLoadingState>

export const loadingReducer = (state = initialState, action: Action ) => {
  switch (action.type) {
  case SET_LOADING_STATE: {
    return {...state, [action.payload]: true};
  }
  case REMOVE_LOADING_STATE: {
    return {...state, [action.payload]: false};
  }
  default:
    return state;
  }
};
