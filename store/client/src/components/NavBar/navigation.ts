interface INavigation {
  link: string;
  title: string;
}

export const navigation: INavigation[] = [
  {
    link: 'branches',
    title: 'Отрасли',
  },
  {
    link: 'solutions',
    title: 'Решения',
  },
  {
    link: 'products',
    title: 'Продукты',
  },
  {
    link: 'services',
    title: 'Наши сервисы',
  },
  {
    link: 'delivery',
    title: 'Доставка',
  },
  {
    link: 'about',
    title: 'О нас',
  },
  {
    link: 'contacts',
    title: 'Контакты',
  },
];
