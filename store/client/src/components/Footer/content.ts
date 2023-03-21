import {aboutList} from '../../commonContent/aboutList';
import {ReactComponent as linkedin} from './image/linkedin.svg';
import {ReactComponent as youtube} from './image/youtube-logo.svg';

export const content = {
  contact: {
    contacts: [
      {
        content: 'Телефон: ',
        link: '+49 (0) 2166 9836-0',
      },
      {
        content: 'Факс: ',
        link: '+49 (0) 2166 83025',
      },
    ],
    title: 'DIAMANT Polymer GmbH',
    address: [
      {
        content: 'Marie-Bernays-Ring 3a',
      },
      {
        content: 'D – 41199 Mönchengladbach',
      },
    ],
  },
  blocks: [
    {
      title: 'Компания',
      list: aboutList,
    },
    {
      title: 'Сервисы',
      list: [
        {
          link: '/',
          content: 'Контракты',
        },
        {
          link: '/',
          content: 'Служба приложений',
        },
        {
          link: '/',
          content: 'Разработка продуктов',
        },
        {
          link: '/',
          content: 'Курсы',
        },
      ],
    },
    {
      title: 'Конфидициальность',
      list: [
        {
          link: '/',
          content: 'Политика приватности',
        },
        {
          link: '/',
          content: 'Куки',
        },
        {
          link: '/',
          content: 'Разработка продуктов',
        },
        {
          link: '/',
          content: 'Курсы',
        },
      ],
    },
  ],
  producer: '© 2023 · DIAMANT Polymer GmbH',
  social: [
    {
      img: linkedin,
      link: 'https://www.linkedin.com/',
      label: 'LinkedIn',
    },
    {
      img: youtube,
      link: 'https://www.youtube.com/',
      label: 'YouTube',
    },
  ],
};
