import {guestInstance, authInstance} from './index';
import {ISubscribe} from '../types/types';

export const subscribe = async (body: {[key: string]: string}): Promise<ISubscribe> => {
  const {data} = await guestInstance.post('subscription/user/create', body);

  return data;
};

export const adminGetAllSubscriptions = async (): Promise<ISubscribe[]> => {
  const {data} = await authInstance.get('subscription/admin/getall');

  return data;
};

export const adminDeleteSubscription = async (id: number): Promise<ISubscribe> => {
  const {data} = await authInstance.delete(`/subscription/admin/delete/${id}`);

  return data;
};
