import {parkingReducer} from '../../src/reducers/parkingReducer';

describe('parkingReducer', () => {
  it('should return the initial state', () => {
    expect(parkingReducer(undefined, {})).toEqual([]);
  });
});
