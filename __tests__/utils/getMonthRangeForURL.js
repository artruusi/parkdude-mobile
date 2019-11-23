import {getMonthRangeForURL} from '../../src/Utils';

describe('getMonthRangeForURL function', () => {
  it('should return dateRange of November', () => {
    const expectedResult = '?startDate=2019-11-01&endDate=2019-11-30';
    const actualResult = getMonthRangeForURL(2019, 10);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return dateRange of December', () => {
    const expectedResult = '?startDate=2019-12-01&endDate=2019-12-31';
    const actualResult = getMonthRangeForURL(2019, 11);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return dateRange of January', () => {
    const expectedResult = '?startDate=2020-01-01&endDate=2020-01-31';
    const actualResult = getMonthRangeForURL(2020, 0);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return dateRange of leap year February', () => {
    const expectedResult = '?startDate=2020-02-01&endDate=2020-02-29';
    const actualResult = getMonthRangeForURL(2020, 1);
    expect(actualResult).toEqual(expectedResult);
  });
});
