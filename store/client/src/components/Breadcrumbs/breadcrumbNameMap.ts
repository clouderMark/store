import CurrentProductStore from '../../store/CurrentItemStore';
import {EPath} from '../../enums/EPath';
import {links} from '../../views/forAdmin/Admin/links';

interface IBreadcrumbNameMap {
  allNames: {[key: string]: string};
  getName(name: string, product: CurrentProductStore): string | undefined;
}

const breadcrumbNameMap: IBreadcrumbNameMap = {
  allNames: {
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
    [EPath.Branches]: 'Отрасли',
    [EPath.Signup]: 'Регистрация',
    [EPath.Login]: 'Войти',
    [EPath.Admin]: 'Управление',
  },

  getName(name, product) {
    let crumb;
    const path = name.split('/');

    if (path.includes(EPath.Shop.slice(1)) && +path.slice(-1) >= 0) {
      crumb = product.productName.charAt(0).toUpperCase() + product.productName.slice(1);
    } else if (path.includes(EPath.AdminMessages.split('/').at(-1)!) && +path.slice(-1) >= 0) {
      crumb = `Сообщение №${path.slice(-1)}`;
    } else if (path.includes(EPath.AdminOrders.split('/').at(-1)!) && +path.slice(-1) >= 0) {
      crumb = `Заказ №${path.slice(-1)}`;
    } else {
      crumb = this.allNames[name];
    }

    return crumb;
  },
};

const adminNameMap: {[key: string]: string} = {};

for (const item of links) {
  adminNameMap[item.address] = item.content;
}

Object.assign(breadcrumbNameMap.allNames, adminNameMap);

export default breadcrumbNameMap;
