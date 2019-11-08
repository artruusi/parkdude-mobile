import MockAsyncStorage from 'mock-async-storage';
import {getCookie, setCookie, removeCookie} from '../../src/CookieStorage';

const testCookieString = 'testCookie123';

describe('CookieStorage', () => {
  it('should store cookie to AsyncStorage', async () => {
    const mockStorage = new MockAsyncStorage();
    await setCookie(testCookieString, mockStorage);
    const cookie = await getCookie(mockStorage);
    expect(cookie).toEqual(testCookieString);
  });

  it('should remove cookie from AsyncStorage', async () => {
    const mockStorage = new MockAsyncStorage();
    await setCookie(testCookieString, mockStorage);
    await removeCookie(mockStorage);
    const cookie = await getCookie(mockStorage);
    expect(cookie).toEqual(null);
  });

  it('should not get cookie that does not exist', async () => {
    const mockStorage = new MockAsyncStorage();
    const cookie = await getCookie(mockStorage);
    expect(cookie).toEqual(null);
  });
});

