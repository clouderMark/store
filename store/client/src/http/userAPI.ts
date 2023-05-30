import {AxiosError} from 'axios';
import jwtDecode from 'jwt-decode';
import {authInstance, guestInstance} from './index';
import {IRegistration} from '../types/types.js';
import {ERoute} from '../enums/ERoute';
import {EToken} from '../enums/EToken';

export const signup = async (email: string, password: string): Promise<IRegistration | false> => {
  try {
    const response = await guestInstance.post(`${ERoute.User}/signup`, {email, password, role: 'USER'});
    const {token} = response.data;
    const user: IRegistration = jwtDecode(token);

    localStorage.setItem(EToken.Token, token);

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
    const response = await guestInstance.post(`${ERoute.User}/login`, {email, password});
    const {token} = response.data;
    const user: IRegistration = jwtDecode(token);

    localStorage.setItem(EToken.Token, token);

    return user;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      alert(e.response.data.message);
    }

    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem(EToken.Token);
};

export const check = async (): Promise<IRegistration | false> => {
  let userToken;
  let userData: IRegistration;

  try {
    userToken = localStorage.getItem(EToken.Token);
    // если в хранилище нет действительного токена
    if (!userToken) {
      return false;
    }

    // токен есть - проверить его подлинность
    const response = await authInstance.get(`${ERoute.User}/check`);

    userToken = response.data.token;
    userData = jwtDecode(userToken);
    localStorage.setItem(EToken.Token, userToken);

    return userData;
  } catch (e) {
    localStorage.removeItem(EToken.Token);

    return false;
  }
};
