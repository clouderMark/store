import {guestInstance} from './index';
import {IBasket} from '../types/types';
import {ERoute} from '../enums/ERoute';

export const fetchBasket = async (): Promise<IBasket> => {
  const {data} = await guestInstance.get(`${ERoute.Basket}/${ERoute.GetOne}`);

  return data;
};

export const append = async (id: number): Promise<IBasket> => {
  const {data} = await guestInstance.put(`${ERoute.Basket}/${ERoute.Product}/${id}/append/1`);

  return data;
};

export const increment = async (id: number): Promise<IBasket> => {
  const {data} = await guestInstance.put(`${ERoute.Basket}/${ERoute.Product}/${id}/increment/1`);

  return data;
};

export const decrement = async (id: number): Promise<IBasket> => {
  const {data} = await guestInstance.put(`${ERoute.Basket}/${ERoute.Product}/${id}/decrement/1`);

  return data;
};

export const remove = async (id: number): Promise<IBasket> => {
  const {data} = await guestInstance.put(`${ERoute.Basket}/${ERoute.Product}/${id}/remove`);

  return data;
};

export const clear = async (): Promise<IBasket> => {
  const {data} = await guestInstance.put(`${ERoute.Basket}/clear`);

  return data;
};
