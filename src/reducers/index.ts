import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {errorReducer} from './errorReducer';
import {myReservationsReducer} from './myReservationsReducer';
import {calendarReducer} from './calendarReducer';
import {reservationReducer} from './reservationReducer';
import {parkingSpotReducer} from './parkingSpotReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  myReservations: myReservationsReducer,
  calendar: calendarReducer,
  reservation: reservationReducer,
  parkingSpots: parkingSpotReducer
});
