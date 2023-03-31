import CurrentProductStore from '../../store/ProductItemStore';
import {EPath} from '../../enums/EPath';

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
    [EPath.Admin]: 'Управление',
    [EPath.AdminOrders]: 'Заказы',
    [EPath.AdminIndustries]: 'Индустрии',
    [EPath.AdminSolutions]: 'Решения',
    [EPath.AdminAreas]: 'Области',
    [EPath.AdminProducts]: 'Товары',
    [EPath.Services]: 'Сервисы',
    [EPath.Areas]: 'Области',
    [EPath.AdminMessages]: 'Сообщения пользователей',
    [EPath.AdminSubscriptions]: 'Подписки',
    [EPath.Branches]: 'Области',
  },

  getName(name, product) {
    let crumb;
    const path = name.split('/');

    if (path.includes(EPath.Shop.slice(1)) && +path.slice(-1) >= 0) {
      crumb = product.name.charAt(0).toUpperCase() + product.name.slice(1);
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

export default breadcrumbNameMap;
