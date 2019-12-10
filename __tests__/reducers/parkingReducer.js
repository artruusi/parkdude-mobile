import {myReservationsReducer} from '../../src/reducers/myReservationsReducer';

describe('myReservationsReducer', () => {
  it('should return the initial state', () => {
    const initialState = {ownedSpots: [], reservations: [], releases: []};
    expect(myReservationsReducer(undefined, {})).toEqual(initialState);
  });
});
