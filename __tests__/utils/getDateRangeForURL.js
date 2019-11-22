import {getDateRangeForURL} from '../../src/Utils';

const fourthNovember = new Date(2019, 10, 4);
const twentyFourthDecember = new Date(2019, 11, 24);
const firstJanuary = new Date(2020, 0, 1);
const secondFebruary = new Date(2020, 1, 2);


describe('getDateRangeForURL function', () => {
  it('should return dateRange of November', () => {
    const expectedResult = '?startDate=2019-11-01&endDate=2019-11-30';
    const actualResult = getDateRangeForURL(fourthNovember);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return dateRange of December', () => {
    const expectedResult = '?startDate=2019-12-01&endDate=2019-12-31';
    const actualResult = getDateRangeForURL(twentyFourthDecember);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return dateRange of January', () => {
    const expectedResult = '?startDate=2020-01-01&endDate=2020-01-31';
    const actualResult = getDateRangeForURL(firstJanuary);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return dateRange of leap year February', () => {
    const expectedResult = '?startDate=2020-02-01&endDate=2020-02-29';
    const actualResult = getDateRangeForURL(secondFebruary);
    expect(actualResult).toEqual(expectedResult);
  });
});
