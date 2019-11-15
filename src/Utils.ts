import {getCookie} from './CookieStorage';
import {CalendarEntry} from './types';
import {Colors} from '../assets/colors';

export async function apiFetch(url: string, params: RequestInit = {}) {
  const cookie = await getCookie();
  return fetch(url, {...params, headers: {cookie, ...params.headers}});
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
