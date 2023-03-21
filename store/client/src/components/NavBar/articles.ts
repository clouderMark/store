import {aboutList} from '../../commonContent/aboutList';

interface IArticle {
  link: string;
  title: string;
  list: IList[];
}

interface IList {
  link: string;
  content: string;
}

export const articles: IArticle[] = [
  {
    link: 'branches',
    title: 'Отрасли',
    list: [],
  },
  {
    link: 'areas',
    title: 'Области',
    list: [],
  },
  {
    link: 'shop',
    title: 'Продукты',
    list: [],
  },
  {
    link: 'services',
    title: 'Наши сервисы',
    list: [],
  },
  {
    link: 'delivery',
    title: 'Доставка',
    list: [],
  },
  {
    link: 'about',
    title: 'О нас',
    list: aboutList,
  },
  {
    link: 'contacts',
    title: 'Контакты',
    list: [],
  },
];
