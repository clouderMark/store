import {queryTablet} from '../../commonContent/queryTablet';
import {queryMobile} from '../query';

export const container = {
  height: 188,
  pt: '29px',
  mb: '9px',

  [`@media (max-width: ${queryTablet}px)`]: {
    height: 105,
    pt: 2.5,
    mb: 0,
  },

  [`@media (max-width: ${queryMobile}px)`]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
};
