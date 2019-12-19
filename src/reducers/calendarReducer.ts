import {GET_CALENDAR_DATA} from '../actions/actionTypes';
import {CalendarReservations} from '../types';

const initialState: CalendarReservations = {
  calendar: [],
  ownedSpots: []
};

export const calendarReducer = (state = initialState, action ) => {
  switch (action.type) {
  case GET_CALENDAR_DATA:
    return {
      calendar: action.payload.calendar,
      ownedSpots: action.payload.ownedSpots
    };
  default:
    return state;
  }
};
