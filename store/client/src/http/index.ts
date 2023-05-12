import axios, {InternalAxiosRequestConfig} from 'axios';
import {EToken} from '../enums/EToken';

const guestInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const authInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(EToken.Token);

  if (token) {
    config.headers.authorization = `Bearer ${localStorage.getItem(EToken.Token)}`;
  }

  return config;
};

authInstance.interceptors.request.use(authInterceptor);

export {guestInstance, authInstance};
