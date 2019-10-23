import { AsyncStorage } from 'react-native';

async function setCookie(cookie: string) {
  try {
    await AsyncStorage.setItem('cookie', cookie)
  } catch (error) {
    console.log(error);
  }
}

async function getCookie() {
  try {
    const cookie = await AsyncStorage.getItem('cookie').catch(e => undefined);
    return cookie;
  } catch (error) {
    console.log(error);
  }
}

async function removeCookie() {
  try {
    await AsyncStorage.removeItem('cookie');
  } catch (error) {
    console.log(error);
  }
}

export { setCookie, getCookie, removeCookie };