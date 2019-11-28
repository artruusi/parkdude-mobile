import {calendarReducer} from '../../src/reducers/calendarReducer';
import {GET_CALENDAR_DATA} from '../../src/actions/actionTypes';

const mockPayload = {calendar: [{
  date: '2019-11-27',
  spacesReservedByUser: [{
    id: '123-id',
    name: '315'
  }],
  availableSpaces: 6
}], ownedSpots: []};

describe('calendarReducer', () => {
  it('should return the initial state', () => {
    expect(calendarReducer(undefined, {})).toEqual({calendar: [], ownedSpots: []});
  });

  it('case GET_CALENDAR_DATA', () => {
    const expextedResult = {calendar: mockPayload.calendar, ownedSpots: mockPayload.ownedSpots};
    expect(calendarReducer(undefined, {type: GET_CALENDAR_DATA, payload: mockPayload})).toEqual(expextedResult);
  });
});
