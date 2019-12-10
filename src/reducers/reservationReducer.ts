import {RESERVE_SPOTS} from '../actions/actionTypes';
import {SuccesfulReservation} from '../types';

// mock
const initialState: SuccesfulReservation = {
  reservations: [],
  message: ''
};

export const reservationReducer = (state = initialState, action ) => {
  switch (action.type) {
  case RESERVE_SPOTS:
    return {
      reservations: action.payload.reservations,
      message: action.payload.message
    };
  default:
    return state;
  }
};
