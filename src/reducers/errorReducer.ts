import { NETWORK_ERROR } from '../actions/actionTypes';

const initialState = {
    hasErrors: false,
    error: ""
};

export const errorReducer = (state = initialState, action ) => {
  switch(action.type) {
    case NETWORK_ERROR:
      return {
        hasErrors: true,
        error: action.payload
      }
      default: 
        return state;
    }
}