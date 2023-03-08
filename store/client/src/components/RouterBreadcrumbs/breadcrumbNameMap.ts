interface IBreadcrumbNameMap {
  allKey: {[key: string]: string};
  getKey(key: string): string | undefined;
}

const breadcrumbNameMap: IBreadcrumbNameMap = {
  allKey: {
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
    '/admin/categories': 'Категории',
    '/admin/brands': 'Бренды',
    '/admin/areas': 'Области',
    '/admin/products': 'Товары',
    '/services': 'Сервисы',
    '/areas': 'Области',
  },
  getKey(key: string) {
    let crumb;
    const path = key.split('/').slice(-1);

    if (+path >= 0) {
      crumb = `${path}`;
    } else {
      crumb = this.allKey[key];
    }

    return crumb;
  },
};

export default breadcrumbNameMap;
