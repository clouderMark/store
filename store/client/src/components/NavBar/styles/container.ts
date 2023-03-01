import {queryMenu} from '../queryMenu';

export const container = {
  width: 1400,
  height: 188,
  pt: 2.1,
  [`@media (max-width: ${queryMenu}px)`]: {
    height: 105,
    pt: 0.9,
  },
};
