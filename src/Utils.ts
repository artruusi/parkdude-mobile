import {getCookie} from './CookieStorage';
import {CalendarEntry} from './types';
import {Colors} from '../assets/colors';

export async function apiFetch(url: string, params: RequestInit = {}) {
  const cookie = await getCookie();
  return fetch(url, {...params, headers: {cookie, ...params.headers}});
}

/**
 * Returns url parameter string containing daterange of of month given as parameter
 */
export function getMonthRangeForURL(year: number, month: number ) {
  const firstOfMonth = new Date(year, month, 1);
  const firstOfNextMonth = new Date(year, month + 1, 1);
  const lastOfMonth = new Date(firstOfNextMonth.setDate(0));

  return `?startDate=${toDateString(firstOfMonth)}&endDate=${toDateString(lastOfMonth)}`;
}

/**
 * Returns ISO formatted date object
 */
export function toDateString(dateObject: Date) {
  const year = padZero(dateObject.getFullYear());
  const month = padZero(dateObject.getMonth()+1);
  const date = padZero(dateObject.getDate());
  return `${year}-${month}-${date}`;
}

function padZero(number: number) {
  return number < 10 ? '0' + number : number.toString();
}

export const createMarkedDatesObject = (entries: CalendarEntry[]) => {
  const result = {};
  entries.forEach((entry) => {
    const userHasOwnReservations = entry.spacesReservedByUser.length > 0;
    result[entry.date] = {
      selected: userHasOwnReservations,
      selectedColor: userHasOwnReservations ? Colors.GREEN : null,
      disabled: entry.availableSpaces === 0
    };
  });
  return result;
};
