import {GET_PARKING_SPOTS} from '../actions/actionTypes';
import {BasicParkingSpotData} from '../types';


const initialState: BasicParkingSpotData[] = [];

const testData: BasicParkingSpotData[] = [
  {id: '1', name: '1'}, {id: '2', name: '2'},
  {id: '3', name: '3'}, {id: '4', name: '4'},
  {id: '5', name: '5'}, {id: '6', name: '6'},
  {id: '7', name: '7'}
];

export const parkingSpotReducer = (state = initialState, action ) => {
  switch (action.type) {
  case GET_PARKING_SPOTS:
    return [
      {id: 'random', name: 'Any free spot'},
      ...action.payload
    ];
    /* return [
      {id: 'random', name: 'Any free spot'},
      ...testData
    ];*/
  default:
    return state;
  }
};
