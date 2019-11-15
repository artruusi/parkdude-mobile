import {GET_CALENDAR_DATA} from '../actions/actionTypes';
import {CalendarReservations} from '../types';

// mock
const initialState: CalendarReservations = {
<<<<<<< HEAD
  calendar: [],
  ownedSpots: []
=======
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
>>>>>>> Added own actions and reducer for calendar, implemented simulated data fetching, added functions to arrow buttons
};

export const calendarReducer = (state = initialState, action ) => {
  switch (action.type) {
  case GET_CALENDAR_DATA:
    return {
      calendar: action.payload.calendar,
<<<<<<< HEAD
      ownedSpots: action.payload.ownedSpots
=======
      totalSpaces: action.payload.totalSpaces,
      userOwnsSpace: action.payload.userOwnsSpace
>>>>>>> Added own actions and reducer for calendar, implemented simulated data fetching, added functions to arrow buttons
    };
  default:
    return state;
  }
};
