import {GET_PARKING_SPOTS} from '../actions/actionTypes';
import {BasicParkingSpotData} from '../types';

const initialState: BasicParkingSpotData[] = [];

export const parkingSpotReducer = (state = initialState, action ) => {
  switch (action.type) {
  case GET_PARKING_SPOTS:
    return [
      {id: 'random', name: 'Any free spot'},
      ...action.payload
    ];
  default:
    return state;
  }
};
