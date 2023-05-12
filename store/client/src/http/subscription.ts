import {guestInstance, authInstance} from './index';
import {ISubscribe} from '../types/types';
import {ERoute} from '../enums/ERoute';

export const subscribe = async (body: {[key: string]: string}): Promise<ISubscribe> => {
  const {data} = await guestInstance.post(`${ERoute.Subscription}/${ERoute.User}/${ERoute.Create}`, body);

  return data;
};

export const adminGetAllSubscriptions = async (): Promise<ISubscribe[]> => {
  const {data} = await authInstance.get(`${ERoute.Subscription}/${ERoute.Admin}/${ERoute.GetAll}`);

  return data;
};

export const adminDeleteSubscription = async (id: number): Promise<ISubscribe> => {
  const {data} = await authInstance.delete(`/${ERoute.Subscription}/${ERoute.Admin}/${ERoute.Delete}/${id}`);

  return data;
};
