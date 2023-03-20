import CurrentProductStore from '../../store/ProductItemStore';

interface IBreadcrumbNameMap {
  allNames: {[key: string]: string};
  getName(name: string, product: CurrentProductStore): string | undefined;
}

const breadcrumbNameMap: IBreadcrumbNameMap = {
  allNames: {
    '/shop': 'Магазин',
    '/shop/ ': 'Продукт',
    '/basket': 'Корзина',
    '/checkout': 'Оформление',
    '/delivery': 'Доставка',
    '/contacts': 'Контакты',
    '*': 'Страница не найдена',
    '/user': 'Кабинет',
    '/user/orders': 'Заказы',
    '/news': 'Новости',
    '/about': 'О нас',
    '/admin': 'Управление',
    '/admin/orders': 'Заказы',
    '/admin/industries': 'Индустрии',
    '/admin/solutions': 'Решения',
    '/admin/areas': 'Области',
    '/admin/products': 'Товары',
    '/services': 'Сервисы',
    '/areas': 'Области',
    '/admin/messages': 'Сообщения пользователей',
    '/admin/subscriptions': 'Подписки',
  },

  getName(name, product) {
    let crumb;
    const path = name.split('/');

    if (path.includes('shop') && +path.slice(-1) >= 0) {
      crumb = product.name.charAt(0).toUpperCase() + product.name.slice(1);
    } else if (path.includes('messages') && +path.slice(-1) >= 0) {
      crumb = `Сообщение №${path.slice(-1)}`;
    } else if (path.includes('orders') && +path.slice(-1) >= 0) {
      crumb = `Заказ №${path.slice(-1)}`;
    } else {
      crumb = this.allNames[name];
    }

    return crumb;
  },
};

export default breadcrumbNameMap;
