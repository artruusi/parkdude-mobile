import {myReservationsReducer} from '../../src/reducers/myReservationsReducer';
import {MY_PARKINGS} from '../../src/actions/actionTypes';

const initialState = {ownedSpots: [], reservations: [], releases: []};
const mockPayload = {
  ownedSpots: [{id: '200', name: '200'}],
  reservations: [{date: '2020-02-02', parkingSpot: {id: '100', name: '100'}}],
  releases: [{date: '2020-03-03', parkingSpot: {id: '200', name: '200'}}]
};

describe('myReservationsReducer', () => {
  it('should return the initial state', () => {
    expect(myReservationsReducer(undefined, {})).toEqual(initialState);
  });

  it('should own reservations', () => {
    expect(myReservationsReducer(undefined, {
      type: MY_PARKINGS,
      payload: mockPayload
    })).toEqual(mockPayload);
  });
});
