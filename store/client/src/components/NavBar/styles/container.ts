import {queryTablet} from '../../../commonContent/queryTablet';

export const container = {
  height: 188,
  pt: '29px',
  mb: '9px',
  // p: 0,
  [`@media (max-width: ${queryTablet}px)`]: {
    height: 105,
    pt: 0.9,
    mb: 0,
  },
};
