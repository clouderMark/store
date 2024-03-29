import {EPath} from '../../enums/EPath';
import {IButtons} from '../../types/types';

export const content: IContent = {
  column1: {
    title:
      'DIAMANT POLYMER: Customised metal-polymer, polymer-composite systems and polymer infiltrates according to highest standards', // eslint-disable-line
  },
  column2: {
    title:
      'As an internationally renowned manufacturer and full-service provider of polymer systems, DIAMANT Polymer GmbH offers innovative and high-quality solutions for industrial applications.', // eslint-disable-line
    p: 'Our products preserve and protect assets and investments. For example, defective castings are not discarded as scrap material, but can be “rescued” and made usable by post-treatment with special polymer systems. Good for our customers and good for the environment. Follow us into a new future and discover the wide range of applications for polymer composite materials and the exciting world of technical impregnation and infiltration systems.', // eslint-disable-line
    buttons: [
      {
        content: 'View Products',
        to: EPath.Shop,
        color: 'first',
        variant: 'contained',
      },
    ],
  },
};

interface IContent {
  column1: {
    title: string;
  };
  column2: {
    title: string;
    p: string;
    buttons: IButtons[]
  };
}
