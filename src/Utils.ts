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

export const createMarkedDatesObject = (entries: CalendarEntry[], userSelectedDates: Record<string, any>) => {
  const today = toDateString(new Date());
  const result = {};
  // Go through date entries got from API
  entries.forEach((entry) => {
    if (dateShouldBeDisabled(today, entry.date)) {
      result[entry.date] = {
        selected: false,
        selectedColor: Colors.WHITE,
        disabled: true
      };
    } else {
      const userHasOwnReservations = entry.spacesReservedByUser.length > 0;
      if (userHasOwnReservations) {
        result[entry.date] = {
          selected: true,
          selectedColor: Colors.GREEN,
          disabled: true
        };
      } else {
        result[entry.date] = {
          selected: false,
          selectedColor: Colors.WHITE,
          disabled: entry.availableSpaces === 0
        };
      }
    }
  });
  // Go through dates which user has seleceted on the calendar
  Object.keys(userSelectedDates).forEach((key) => {
    if (key in result) {
      if (result[key].selectedColor != Colors.GREEN && result[key].disabled == false) {
        result[key].selected = true;
        result[key].selectedColor = Colors.YELLOW;
      }
    } else {
      result[key] = {selected: true, selectedColor: Colors.YELLOW, disabled: false};
    }
  });
  return result;
};

export const dateShouldBeDisabled = (today: string, date: string) => {
  return date < today;
};

export const prettierDateOutput = (date: string) => {
  return (date.slice(8) + '.' + date.slice(5, 7) + '.' + date.slice(0, 4));
};
