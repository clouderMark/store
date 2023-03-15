import {guestInstance} from './index';

export const sendMessage = async (body: IMessageBody): Promise<boolean> => {
  const {data} = await guestInstance.post('message/user/create', body);

  return data;
};

interface IMessageBody {
  company: string;
  name: string;
  email: string;
  phone: string;
  question: string;
  type: string;
}
