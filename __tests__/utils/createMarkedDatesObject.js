import {createMarkedDatesObject} from '../../src/Utils';
import {Colors} from '../../assets/colors';

const testDay = '2019-11-15';
const testDay2 = '2019-11-16';
const testUserReservations = [{id: '123-id', name: '315'}];

describe('createMarkedDatesObject function', () => {
  it('should return empty object', () => {
    const expectedResult = {};
    const actualResult = createMarkedDatesObject([], {});
    expect(expectedResult).toEqual(actualResult);
  });

  it('no reservations', () => {
    const expectedResult = {
      [testDay]: {
        selected: false,
        selectedColor: Colors.WHITE,
        disabled: false
      }
    };
    const actualResult = createMarkedDatesObject(
      [{date: testDay, spacesReservedByUser: [], availableSpaces: 2}],
      {}
    );
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
      [{date: testDay, spacesReservedByUser: testUserReservations, availableSpaces: 2}],
      {}
    );
    expect(expectedResult).toEqual(actualResult);
  });

  it('no available spots for day', () => {
    const expectedResult = {
      [testDay]: {
        selected: false,
        selectedColor: Colors.WHITE,
        disabled: true
      }
    };
    const actualResult = createMarkedDatesObject(
      [{date: testDay, spacesReservedByUser: [], availableSpaces: 0}],
      {}
    );
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
      [{date: testDay, spacesReservedByUser: testUserReservations, availableSpaces: 0}],
      {}
    );
    expect(expectedResult).toEqual(actualResult);
  });

  it('User has active selection on calendar', () => {
    const expectedResult = {
      [testDay]: {
        selected: true,
        selectedColor: Colors.YELLOW,
        disabled: false
      }
    };
    const actualResult = createMarkedDatesObject(
      [],
      {[testDay]: {selected: true, selectedColor: Colors.YELLOW}}
    );
    expect(expectedResult).toEqual(actualResult);
  });

  it('User has active selection on calendar and own reservations', () => {
    const expectedResult = {
      [testDay]: {
        selected: true,
        selectedColor: Colors.GREEN,
        disabled: false
      },
      [testDay2]: {
        selected: true,
        selectedColor: Colors.YELLOW,
        disabled: false
      }
    };
    const actualResult = createMarkedDatesObject(
      [{date: testDay, spacesReservedByUser: testUserReservations, availableSpaces: 3}],
      {[testDay2]: {selected: true, selectedColor: Colors.YELLOW}}
    );
    expect(expectedResult).toEqual(actualResult);
  });

  it('User tries to select a day where is his own active reservation', () => {
    const expectedResult = {
      [testDay]: {
        selected: true,
        selectedColor: Colors.GREEN,
        disabled: false
      }
    };
    const actualResult = createMarkedDatesObject(
      [{date: testDay, spacesReservedByUser: testUserReservations, availableSpaces: 3}],
      {[testDay]: {selected: true, selectedColor: Colors.YELLOW}}
    );
    expect(expectedResult).toEqual(actualResult);
  });

  it('User tries to select a day where is no spots available', () => {
    const expectedResult = {
      [testDay]: {
        selected: false,
        selectedColor: Colors.WHITE,
        disabled: true
      }
    };
    const actualResult = createMarkedDatesObject(
      [{date: testDay, spacesReservedByUser: [], availableSpaces: 0}],
      {[testDay]: {selected: true, selectedColor: Colors.YELLOW}}
    );
    expect(expectedResult).toEqual(actualResult);
  });
});
