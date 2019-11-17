import {MY_PARKINGS, SIMULATE} from '../actions/actionTypes';
import {ParkingSpotEventType, ParkingSpotEvent} from '../types';


// mock
const initialState: ParkingSpotEvent[] = [];

export const parkingReducer = (state = initialState, action ) => {
  switch (action.type) {
  case MY_PARKINGS:
    return [
      ...state
    ];
  case SIMULATE:
    return [
      ...state,
      {
        type: ParkingSpotEventType.PARKING,
        id: 253,
        // startDate: new Date(),
        // endDate: new Date()
      },
      {
        type: ParkingSpotEventType.RELEASE,
        id: 254,
        // startDate: new Date(),
        // endDate: new Date()
      },
      {
        type: ParkingSpotEventType.PARKING,
        id: 255,
        // startDate: new Date(),
        // endDate: new Date()
      }
    ];
  default:
    return state;
  }
};
