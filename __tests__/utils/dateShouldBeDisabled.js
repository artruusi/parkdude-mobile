import {dateShouldBeDisabled, toDateString} from '../../src/Utils';

const todayDate = new Date();
const today = toDateString(todayDate);
const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = toDateString(tomorrowDate);
const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
const yesterday = toDateString(yesterdayDate);
const yearAgoDate = new Date();
yearAgoDate.setFullYear(yearAgoDate.getFullYear() - 1);
const yearAgo = toDateString(yearAgoDate);
const inAYearDate = new Date();
inAYearDate.setFullYear(inAYearDate.getFullYear() + 1);
const inAYear = toDateString(inAYearDate);

describe('dateShouldBeDisabled function', () => {
  it('yesterday < today ==> return true', () => {
    const actualResult = dateShouldBeDisabled(today, yesterday);
    expect(actualResult).toEqual(true);
  });

  it('tomorrow < today ==> return false', () => {
    const actualResult = dateShouldBeDisabled(today, tomorrow);
    expect(actualResult).toEqual(false);
  });

  it('today < today ==> return false', () => {
    const actualResult = dateShouldBeDisabled(today, today);
    expect(actualResult).toEqual(false);
  });

  it('year ago < today ==> return true', () => {
    const actualResult = dateShouldBeDisabled(today, yearAgo);
    expect(actualResult).toEqual(true);
  });

  it('in a year < today ==> return false', () => {
    const actualResult = dateShouldBeDisabled(today, inAYear);
    expect(actualResult).toEqual(false);
  });
});
