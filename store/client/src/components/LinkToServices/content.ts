import image from './images/diamant-unser-service-450x386.png';
import {EPath} from '../../enums/EPath';
import {ITwoColumnContent} from '../../types/types';

export const content: ITwoColumnContent = {
  column1: {
    image: image,
  },
  column2: {
    title: {
      top: 'our service',
      bottom: 'Full service from a single source: product development, contract manufacturing, assembly & more',
    },
    list: {
      header: 'DIAMANT polymers are used, among other things:',
      items: [
        'for force-fit gap compensation of steel connections',
        'for impregnation of leaking metal components',
        'for wear protection of metal surfaces',
        'for sealing thermally sprayed layers',
        'for blow hole repairs on castings',
        'for sealing and infiltration of 3D printed parts in the field of additive manufacturing',
        'as high performance body fillers',
      ],
    }, // eslint-disable-next-line
    p: 'Our services are as diverse as our products. As a full-service provider, we supply you with everything from a single source, including product development in our own laboratory, technical consulting and installation services. Are you looking for contract manufacturing or a private label product? Here, you are also in good hands with us. We will be happy to support you with the realisation. Benefit from more than 100 years of experience in handling and manufacturing polymer systems.',
    buttons: [
      {
        content: 'our service',
        color: 'first',
        variant: 'contained',
        to: EPath.Services,
      },
    ],
  },
};