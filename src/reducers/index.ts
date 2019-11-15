import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {errorReducer} from './errorReducer';
import {parkingReducer} from './parkingReducer';
import {calendarReducer} from './calendarReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  parking: parkingReducer,
  calendar: calendarReducer
});
