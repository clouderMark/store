import {EPath} from '../../../enums/EPath';

interface ILinks {
  address: string;
  content: string;
}

export const links: ILinks[] = [
  {
    address: EPath.AdminOrders,
    content: 'Заказы в магазине',
  },
  {
    address: EPath.AdminIndustries,
    content: 'Индустрии',
  },
  {
    address: EPath.AdminSubIndustries,
    content: 'Подиндустрии',
  },
  {
    address: EPath.AdminSolutions,
    content: 'Решения',
  },
  {
    address: EPath.AdminAreas,
    content: 'Области применения',
  },
  {
    address: EPath.AdminProducts,
    content: 'Товары',
  },
  {
    address: EPath.AdminMessages,
    content: 'Сообщения пользователей',
  },
  {
    address: EPath.AdminSubscriptions,
    content: 'Подписки',
  },
];
