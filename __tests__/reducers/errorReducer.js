import {errorReducer} from '../../src/reducers/errorReducer';
import {NETWORK_ERROR} from '../../src/actions/actionTypes';

describe('errorReducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toEqual({
      hasErrors: false,
      error: ''
    });
  });

  it('should return network error', () => {
    expect(errorReducer(undefined, {
      type: NETWORK_ERROR,
      payload: NETWORK_ERROR
    })).toEqual({
      hasErrors: true,
      error: NETWORK_ERROR
    });
  });
});
