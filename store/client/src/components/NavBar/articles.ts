interface IArticle {
  link: string;
  title: string;
  list: IList[]
}

interface IList {
  link: string;
  content: string;
}

export const articles: IArticle[] = [
  {
    link: 'branches',
    title: 'Отрасли',
    list: [
      {
        link: '111',
        content: 'Корпаративные правила',
      },
      {
        link: '222',
        content: 'Устойчивость',
      },
      {
        link: '333',
        content: 'Партнеры',
      },
    ],
  },
  {
    link: 'areas',
    title: 'Области',
    list: [
      {
        link: '111',
        content: 'Корпаративные правила',
      },
      {
        link: '222',
        content: 'Устойчивость',
      },
      {
        link: '333',
        content: 'Партнеры',
      },
    ],
  },
  {
    link: 'shop',
    title: 'Продукты',
    list: [
      {
        link: '111',
        content: 'Корпаративные правила',
      },
      {
        link: '222',
        content: 'Устойчивость',
      },
      {
        link: '333',
        content: 'Партнеры',
      },
    ],
  },
  {
    link: 'services',
    title: 'Наши сервисы',
    list: [
      {
        link: '111',
        content: 'Корпаративные правила',
      },
      {
        link: '222',
        content: 'Устойчивость',
      },
      {
        link: '333',
        content: 'Партнеры',
      },
    ],
  },
  {
    link: 'delivery',
    title: 'Доставка',
    list: [
      {
        link: '111',
        content: 'Корпаративные правила',
      },
      {
        link: '222',
        content: 'Устойчивость',
      },
      {
        link: '333',
        content: 'Партнеры',
      },
    ],
  },
  {
    link: 'about',
    title: 'О нас',
    list: [
      {
        link: '111',
        content: 'Корпаративные правила',
      },
      {
        link: '222',
        content: 'Устойчивость',
      },
      {
        link: '333',
        content: 'Партнеры',
      },
    ],
  },
  {
    link: 'contacts',
    title: 'Контакты',
    list: [
      {
        link: '111',
        content: 'Корпаративные правила',
      },
      {
        link: '222',
        content: 'Устойчивость',
      },
      {
        link: '333',
        content: 'Партнеры',
      },
    ],
  },
];
