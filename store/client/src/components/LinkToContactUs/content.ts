import image from './images/diamant-qualitaet-450x386.png';
import {EPath} from '../../enums/EPath';
import {ITwoColumnContent} from '../../types/types';

export const content: ITwoColumnContent = {
  column1: {
    image: image,
  },

  column2: {
    title: {
      top: 'diamant polymer - news',
      bottom: '“Quality is when the customer comes back – not the product”.',
    },
    paragraph:
      // eslint-disable-next-line
      'You can also benefit from metal-polymer systems and the many years of experience of DIAMANT Polymer GmbH. Our products are ideal for occasional small repairs, large-scale repairs, the infiltration of nanoscale ceramic structures and the force-fit connection of large steel structures: Our products are as versatile and individual as the areas in which they are used every day.',
    list: {
      header: 'DIAMANT Polymer GmbH offers you:',
      items: [
        'competent advice from experienced specialist staff',
        'customised product development',
        'direct on-site assembly',
        'worldwide available product range',
        'quality “Made in Germany”',
        'tradition, innovation and highest quality.',
      ],
    }, // eslint-disable-next-line
    p: 'Would you like to learn more about the advantages of our products and services? Contact us now. Our experienced staff will be happy to help you. Contact us',
    buttons: [
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
    ],
  },
};
