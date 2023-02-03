import {guestInstance} from './index.js';
import {IBasket} from '../types/types.js';

export const fetchBasket = async (): Promise<IBasket> => {
  const {data} = await guestInstance.get('basket/getone');

  return data;
};

export const append = async (id: number): Promise<IBasket> => {
  const {data} = await guestInstance.put(`basket/product/${id}/append/1`);

  return data;
};

export const increment = async (id: number): Promise<IBasket> => {
  const {data} = await guestInstance.put(`basket/product/${id}/increment/1`);

  return data;
};

export const decrement = async (id: number): Promise<IBasket> => {
  const {data} = await guestInstance.put(`basket/product/${id}/decrement/1`);

  return data;
};

export const remove = async (id: number): Promise<IBasket> => {
  const {data} = await guestInstance.put(`basket/product/${id}/remove`);

  return data;
};

export const clear = async (): Promise<IBasket> => {
  const {data} = await guestInstance.put('basket/clear');

  return data;
};
