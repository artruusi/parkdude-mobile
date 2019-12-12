import {reservationReducer} from '../../src/reducers/reservationReducer';
import {RESERVE_SPOTS} from '../../src/actions/actionTypes';

const initialState = {reservations: [], message: ''};
const successResponse = {
  reservations: [{date: '2019-31-12', parkingSpot: {id: '1', name: '1'}}],
  message: 'test'
};

describe('reservationReducer', () => {
  it('should return the initial state', () => {
    const initialState = {reservations: [], message: ''};
    expect(reservationReducer(undefined, {})).toEqual(initialState);
  });

  it('succesful reservation', () => {
    expect(reservationReducer(initialState, {type: RESERVE_SPOTS, payload: successResponse})).toEqual(successResponse);
  });
});
