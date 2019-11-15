import {GET_CALENDAR_DATA} from '../actions/actionTypes';
import {CalendarReservations} from '../types';

// mock
const initialState: CalendarReservations = {
  calendar: [
    {
      date: '2019-11-27',
      spacesReservedByUser: [{
        id: '123-id',
        name: '315'
      }],
      availableSpaces: 6
    },
    {
      date: '2019-11-28',
      spacesReservedByUser: [],
      availableSpaces: 0
    },
    {
      date: '2019-11-29',
      spacesReservedByUser: [],
      availableSpaces: 3
    },
  ],
  totalSpaces: 0,
  userOwnsSpace: false
};

export const calendarReducer = (state = initialState, action ) => {
  switch (action.type) {
  case GET_CALENDAR_DATA:
    return {
      calendar: action.payload.calendar,
      totalSpaces: action.payload.totalSpaces,
      userOwnsSpace: action.payload.userOwnsSpace
    };
  default:
    return state;
  }
};
