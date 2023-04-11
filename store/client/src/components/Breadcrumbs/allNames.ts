import {EPath} from '../../enums/EPath';
import {links} from '../../views/forAdmin/Admin/links';

export const allNames: {[key: string]: string} = {
  [EPath.Shop]: 'Магазин',
  '/shop/ ': 'Продукт',
  [EPath.Basket]: 'Корзина',
  [EPath.Checkout]: 'Оформление',
  [EPath.Delivery]: 'Доставка',
  [EPath.Contacts]: 'Контакты',
  [EPath.NotFound]: 'Страница не найдена',
  [EPath.User]: 'Кабинет',
  [EPath.UserOrders]: 'Заказы',
  [EPath.News]: 'Новости',
  [EPath.About]: 'О нас',
  [EPath.Services]: 'Сервисы',
  [EPath.Areas]: 'Области',
  [EPath.Industries]: 'Отрасли',
  [EPath.Signup]: 'Регистрация',
  [EPath.Login]: 'Войти',
  [EPath.Admin]: 'Управление',
};

const adminNameMap: {[key: string]: string} = {};

for (const item of links) {
  adminNameMap[item.address] = item.content;
}

Object.assign(allNames, adminNameMap);
