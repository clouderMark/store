import image from './images/diamant-unser-service-450x386.png';
import {EPath} from '../../../enums/EPath';
import {IInfo, IButtons} from '../../../types/types';

export const content: IInfo = {
  id: 0,
  image: image,
  title: 'our service',
  header: 'Full service from a single source: product development, contract manufacturing, assembly & more',
  listTitle: 'DIAMANT polymers are used, among other things:',
  listItems: [
    {
      id: 0,
      value: 'for force-fit gap compensation of steel connections',
    },
    {
      id: 1,
      value: 'for impregnation of leaking metal components',
    },
    {
      id: 2,
      value: 'for wear protection of metal surfaces',
    },
    {
      id: 3,
      value: 'for sealing thermally sprayed layers',
    },
    {
      id: 4,
      value: 'for blow hole repairs on castings',
    },
    {
      id: 5,
      value: 'for sealing and infiltration of 3D printed parts in the field of additive manufacturing',
    },
    {
      id: 6,
      value: 'as high performance body fillers',
    },
  ],
  paragraphs: [
    {
      id: 0,
      value:
        // eslint-disable-next-line
        'Our services are as diverse as our products. As a full-service provider, we supply you with everything from a single source, including product development in our own laboratory, technical consulting and installation services. Are you looking for contract manufacturing or a private label product? Here, you are also in good hands with us. We will be happy to support you with the realisation. Benefit from more than 100 years of experience in handling and manufacturing polymer systems.',
    },
  ],
};

export const buttons: IButtons[] = [
  {
    content: 'our service',
    color: 'first',
    variant: 'contained',
    to: EPath.Services,
  },
];
