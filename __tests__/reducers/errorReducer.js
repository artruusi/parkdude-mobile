import {errorReducer} from '../../src/reducers/errorReducer';
import {NETWORK_ERROR} from '../../src/actions/actionTypes';

describe('errorReducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toEqual({
      networkError: '',
      postReservationError: {message: '', dates: []}
    });
  });

  it('should return network error', () => {
    const errorString = 'errorString';
    expect(errorReducer(undefined, {
      type: NETWORK_ERROR,
      payload: errorString
    })).toEqual({
      networkError: errorString,
      postReservationError: {message: '', dates: []}
    });
  });
});
