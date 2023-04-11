import CurrentProductStore from '../../store/CurrentItemStore';
import {EPath} from '../../enums/EPath';
import {links} from '../../views/forAdmin/Admin/links';
import {IFetchIndystry} from '../../types/types';

interface IBreadcrumbNameMap {
  allNames: {[key: string]: string};
  getName(name: string, product: CurrentProductStore, industries?: IFetchIndystry[]): string | undefined;
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
    [EPath.Industries]: 'Отрасли',
    [EPath.Signup]: 'Регистрация',
    [EPath.Login]: 'Войти',
    [EPath.Admin]: 'Управление',
  },

  getName(name, item, industries) {
    let crumb;
    const path = name.split('/');

    if (path.includes(EPath.Shop.slice(1)) && +path.slice(-1) >= 0) {
      crumb = item.productName.charAt(0).toUpperCase() + item.productName.slice(1);
    } else if (path.includes(EPath.AdminMessages.split('/').at(-1)!) && +path.slice(-1) >= 0) {
      crumb = `Сообщение №${path.slice(-1)}`;
    } else if (path.includes(EPath.AdminOrders.split('/').at(-1)!) && +path.slice(-1) >= 0) {
      crumb = `Заказ №${path.slice(-1)}`;
    } else if (path.includes(EPath.Industries.slice(1)) && +path.slice(-1) >= 0) {
      if (industries) {
        crumb = (industries.find((el) => el.id === +path[2])?.name);
      }

      if (path.length === 4) {
        crumb = item.subBranchName;
      }
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
