import {createMarkedDatesObject} from '../../src/Utils';
import {Colors} from '../../assets/colors';

const testDay = '2019-11-15';
const testUserReservations = [{id: '123-id', name: '315'}];

describe('createMarkedDatesObject function', () => {
  it('should return empty object', () => {
    const expectedResult = {};
    const actualResult = createMarkedDatesObject([]);
    expect(expectedResult).toEqual(actualResult);
  });

  it('no reservations', () => {
    const expectedResult = {
      [testDay]: {
        selected: false,
        selectedColor: null,
        disabled: false
      }
    };
    const actualResult = createMarkedDatesObject(
      [
        {date: testDay, spacesReservedByUser: [], availableSpaces: 2}
      ]);
    expect(expectedResult).toEqual(actualResult);
  });

  it('user has reservation', () => {
    const expectedResult = {
      [testDay]: {
        selected: true,
        selectedColor: Colors.GREEN,
        disabled: false
      }
    };
    const actualResult = createMarkedDatesObject(
      [
        {date: testDay, spacesReservedByUser: testUserReservations, availableSpaces: 2}
      ]);
    expect(expectedResult).toEqual(actualResult);
  });

  it('no available spots for day', () => {
    const expectedResult = {
      [testDay]: {
        selected: false,
        selectedColor: null,
        disabled: true
      }
    };
    const actualResult = createMarkedDatesObject(
      [
        {date: testDay, spacesReservedByUser: [], availableSpaces: 0}
      ]);
    expect(expectedResult).toEqual(actualResult);
  });

  it('user has reservations and there is no other available spots', () => {
    const expectedResult = {
      [testDay]: {
        selected: true,
        selectedColor: Colors.GREEN,
        disabled: true
      }
    };
    const actualResult = createMarkedDatesObject(
      [
        {date: testDay, spacesReservedByUser: testUserReservations, availableSpaces: 0}
      ]);
    expect(expectedResult).toEqual(actualResult);
  });
});
