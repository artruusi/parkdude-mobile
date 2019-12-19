import {MY_PARKINGS} from '../actions/actionTypes';
import {MyReservations} from '../types';

const initialState: MyReservations = {
  ownedSpots: [],
  reservations: [],
  releases: []
};

export const myReservationsReducer = (state = initialState, action ) => {
  switch (action.type) {
  case MY_PARKINGS:
    return {
      ownedSpots: action.payload.ownedSpots,
      reservations: action.payload.reservations,
      releases: action.payload.releases
    };
  default:
    return state;
  }
};
