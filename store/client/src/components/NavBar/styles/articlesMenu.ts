import {queryMenu} from '../queryMenu';

export const box = {
  pt: 0.7,
  cursor: 'pointer',
  [`@media (max-width: ${queryMenu}px)`]: {
    pt: 0,
  },
};

export const popUpMenu = {
  width: '100%',
  left: 0,
  right: 0,
};
