import {MY_PARKINGS, SIMULATE} from '../actions/actionTypes';
import {MyReservations} from '../types';


const initialState: MyReservations = {
  ownedSpots: [],
  reservations: [],
  releases: [],
  timestamp: 0
};

/* const testData: MyReservations = {
  ownedSpots: [{id: '2', name: '254'}],
  reservations: [{date: '2019-12-01', parkingSpot: {id: '1', name: '253'}},
    {date: '2019-12-02', parkingSpot: {id: '3', name: '255'}},
    {date: '2019-12-03', parkingSpot: {id: '3', name: '255'}}
  ],
  releases: [
    {date: '2019-12-04', parkingSpot: {id: '2', name: '254'}},
    {date: '2019-12-05', parkingSpot: {id: '2', name: '254'}}
  ]
};*/

export const myReservationsReducer = (state = initialState, action ) => {
  switch (action.type) {
  case MY_PARKINGS:
    return {
      ownedSpots: action.payload.ownedSpots,
      reservations: action.payload.reservations,
      releases: action.payload.releases,
      timestamp: + new Date()
    };
  /* case SIMULATE:
    return testData;*/
  default:
    return state;
  }
};
