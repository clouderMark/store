import jwtDecode from 'jwt-decode';
import {authInstance, guestInstance} from './index.js';

export const signup = async (email, password) => {
  try {
    const response = await guestInstance.post('user/signup', {email, password, role: 'USER'});
    const {token} = response.data;
    const user = jwtDecode(token);

    localStorage.setItem('token', token);

    return user;
  } catch (e) { // eslint-disable-next-line
    alert(e.response.data.message);

    return false;
  }
};

export const login = async (email, password) => {
  try {
    const response = await guestInstance.post('user/login', {email, password});
    const {token} = response.data;
    const user = jwtDecode(token);

    localStorage.setItem('token', token);

    return user;
  } catch (e) { // eslint-disable-next-line
    alert(e.response.data.message);

    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const check = async () => {
  let userToken;
  let userData;

  try {
    userToken = localStorage.getItem('token');
    // если в хранилище нет действительного токена
    if (!userToken) {
      return false;
    }

    // токен есть - проверить его подлинность
    const response = await authInstance.get('user/check');

    userToken = response.data.token;
    userData = jwtDecode(userToken);
    localStorage.setItem('token', userToken);

    return userData;
  } catch (e) {
    localStorage.removeItem('token');

    return false;
  }
};
