import {getCookie} from './CookieStorage';

export async function apiFetch(url: string, params: RequestInit = {}) {
  const cookie = await getCookie();
  return fetch(url, {...params, headers: {cookie, ...params.headers}});
}

/**
 * Returns url parameter string containing daterange of of month given as parameter
 */

export function getDateRangeForURL(dateObject: Date) {
  const firstOfMonth = new Date(dateObject.getFullYear(), dateObject.getMonth(), 1);
  const firstOfNextMonth = new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 1);
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
