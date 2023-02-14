import {AxiosError} from 'axios';
import jwtDecode from 'jwt-decode';
import {authInstance, guestInstance} from './index';
import {IRegistration} from '../types/types.js';

export const signup = async (email: string, password: string): Promise<IRegistration | false> => {
  try {
    const response = await guestInstance.post('user/signup', {email, password, role: 'USER'});
    const {token} = response.data;
    const user: IRegistration = jwtDecode(token);

    localStorage.setItem('token', token);

    return user;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      alert(e.response.data.message);
    }

    return false;
  }
};

export const login = async (email: string, password: string): Promise<IRegistration | false> => {
  try {
    const response = await guestInstance.post('user/login', {email, password});
    const {token} = response.data;
    const user: IRegistration = jwtDecode(token);

    localStorage.setItem('token', token);

    return user;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      alert(e.response.data.message);
    }

    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const check = async (): Promise<IRegistration | false> => {
  let userToken;
  let userData: IRegistration;

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
