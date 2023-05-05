import {guestInstance, authInstance} from './index';
import {IMessageBody, IMessage} from '../types/types';
import {ERoute} from '../enums/ERoute';

export const sendMessage = async (body: IMessageBody): Promise<boolean> => {
  const {data} = await guestInstance.post(`${ERoute.Message}/${ERoute.User}/${ERoute.Create}`, body);

  return data;
};

export const adminGetAllMessages = async (): Promise<IMessage[]> => {
  const {data} = await authInstance.get(`${ERoute.Message}/${ERoute.Admin}/${ERoute.GetAll}`);

  return data;
};

export const adminDelete = async (id: number): Promise<IMessage> => {
  const {data} = await authInstance.delete(`${ERoute.Message}/${ERoute.Admin}/${ERoute.Delete}/${id}`);

  return data;
};

export const adminGetOneMessage = async (id: number): Promise<IMessage> => {
  const {data} = await authInstance.get(`${ERoute.Message}/${ERoute.Admin}/${ERoute.GetOne}/${id}`);

  return data;
};
