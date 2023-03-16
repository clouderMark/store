import {guestInstance} from './index';

export const subscribe = async (body: {[key: string]: string}): Promise<ISubscribe> => {
  const {data} = await guestInstance.post('subscription/user/create', body);

  return data;
};

interface ISubscribe {
  createdAt: string;
  email: string;
  id: number;
  updatedAt: string;
}
