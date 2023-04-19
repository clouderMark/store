import image from './images/diamant-qualitaet-450x386.png';
import {EPath} from '../../../enums/EPath';
import {IInfo, IButtons} from '../../../types/types';

export const content: IInfo = {
  id: 0,
  image: image,
  title: 'diamant polymer - news',
  header: '“Quality is when the customer comes back – not the product”.',
  listTitle: 'DIAMANT Polymer GmbH offers you:',
  listItems: [
    {
      id: 0,
      value: 'competent advice from experienced specialist staff',
    },
    {
      id: 1,
      value: 'customised product development',
    },
    {
      id: 2,
      value: 'direct on-site assembly',
    },
    {
      id: 3,
      value: 'worldwide available product range',
    },
    {
      id: 4,
      value: 'quality “Made in Germany”',
    },
    {
      id: 5,
      value: 'tradition, innovation and highest quality.',
    },
  ],
  paragraphs: [
    {
      id: 0,
      value:
        // eslint-disable-next-line
        'You can also benefit from metal-polymer systems and the many years of experience of DIAMANT Polymer GmbH. Our products are ideal for occasional small repairs, large-scale repairs, the infiltration of nanoscale ceramic structures and the force-fit connection of large steel structures: Our products are as versatile and individual as the areas in which they are used every day.',
    },
    {
      id: 1,
      value:
        // eslint-disable-next-line
        'Would you like to learn more about the advantages of our products and services? Contact us now. Our experienced staff will be happy to help you. Contact us',
    },
  ],
};

export const buttons: IButtons[] = [
  {
    content: 'contact us',
    color: 'first',
    variant: 'contained',
    to: EPath.Contacts,
  },
  {
    content: 'learn more about DIAMANT',
    color: 'first',
    variant: 'outlined',
    to: EPath.Contacts,
  },
];
