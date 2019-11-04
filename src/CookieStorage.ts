import {AsyncStorage} from 'react-native';

const setCookie = async (cookie: string, storage=AsyncStorage) => {
  try {
    await storage.setItem('cookie', cookie);
  } catch (error) {
    console.log(error);
  }
};

const getCookie = async (storage=AsyncStorage) => {
  try {
    const cookie = await storage.getItem('cookie').catch((e) => undefined);
    return cookie;
  } catch (error) {
    console.log(error);
  }
};

const removeCookie = async (storage=AsyncStorage) => {
  try {
    await storage.removeItem('cookie');
  } catch (error) {
    console.log(error);
  }
};

export {setCookie, getCookie, removeCookie};
