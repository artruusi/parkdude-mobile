import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {errorReducer} from './errorReducer';
import {parkingReducer} from './parkingReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  parking: parkingReducer
});
