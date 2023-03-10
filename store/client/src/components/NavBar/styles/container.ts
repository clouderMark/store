import {queryMenu} from '../queryMenu';

export const container = {
  height: 188,
  pt: '29px',
  mb: '9px',
  // p: 0,
  [`@media (max-width: ${queryMenu}px)`]: {
    height: 105,
    pt: 0.9,
    mb: 0,
  },
};
