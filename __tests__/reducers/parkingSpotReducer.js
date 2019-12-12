import {parkingSpotReducer} from '../../src/reducers/parkingSpotReducer';
import {GET_PARKING_SPOTS} from '../../src/actions/actionTypes';

const initialState = [];
const mockPayload = [{id: '1', name: '1'}, {id: '2', name: '2'}];

describe('parkingSpotReducer', () => {
  it('should return the initial state', () => {
    expect(parkingSpotReducer(undefined, {})).toEqual(initialState);
  });

  it('get available spots', () => {
    expect(parkingSpotReducer(undefined, {
      type: GET_PARKING_SPOTS,
      payload: mockPayload
    })).toEqual([
      {id: 'random', name: 'Any free spot'},
      ...mockPayload
    ]);
  });
});
