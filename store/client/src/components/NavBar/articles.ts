import {aboutList} from '../commonContent/aboutList';
import {EPath} from '../../enums/EPath';
import {IArticle} from './types';
import {EName} from '../../enums/EName';

export const articles: IArticle[] = [
  {
    link: EPath.Industries,
    title: 'Отрасли',
    list: [],
  },
  {
    link: EPath.Solutions,
    title: EName.Solutions,
    list: [],
  },
  {
    link: EPath.Shop,
    title: 'Продукты',
    list: [],
  },
  {
    link: EPath.Services,
    title: 'Наши сервисы',
    list: [],
  },
  {
    link: EPath.Delivery,
    title: 'Доставка',
    list: [],
  },
  {
    link: EPath.About,
    title: 'О нас',
    list: aboutList,
  },
  {
    link: EPath.Contacts,
    title: 'Контакты',
    list: [],
  },
];
