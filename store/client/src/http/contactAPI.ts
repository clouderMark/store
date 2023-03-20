import {guestInstance, authInstance} from './index';
import {IMessageBody, IMessage} from '../types/types';

export const sendMessage = async (body: IMessageBody): Promise<boolean> => {
  const {data} = await guestInstance.post('message/user/create', body);

  return data;
};

export const adminGetAllMessages = async (): Promise<IMessage[]> => {
  const {data} = await authInstance.get('message/admin/getall');

  return data;
};

export const adminDelete = async (id: number): Promise<IMessage> => {
  const {data} = await authInstance.delete(`message/admin/delete/${id}`);

  return data;
};

export const adminGetOneMessage = async (id: number): Promise<IMessage> => {
  const {data} = await authInstance.get(`message/admin/getone/${id}`);

  return data;
};
