import {getCookie} from './CookieStorage';
import {CalendarEntry} from './types';
import {Colors} from '../assets/colors';

export async function apiFetch(url: string, params: RequestInit = {}) {
  const cookie = await getCookie();
  return fetch(url, {...params, headers: {cookie, ...params.headers}});
}

export const createMarkedDatesObject = (entries: CalendarEntry[], userSelectedDates: Record<string, any>) => {
  const result = {};
  entries.forEach((entry) => {
    const userHasOwnReservations = entry.spacesReservedByUser.length > 0;
    result[entry.date] = {
      selected: userHasOwnReservations,
      selectedColor: userHasOwnReservations ? Colors.GREEN : Colors.WHITE,
      disabled: entry.availableSpaces === 0
    };
  });
  const keys = Object.keys(userSelectedDates);
  keys.forEach((key) => {
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

