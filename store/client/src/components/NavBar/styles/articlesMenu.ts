import {queryMenu} from '../queryMenu';

export const articleMenu = {
  box: {
    pt: 0.7,
    cursor: 'pointer',
    [`@media (max-width: ${queryMenu}px)`]: {
      pt: 0,
    },
  },
  popUpMenu: {
    width: '100%',
    left: 0,
    right: 0,
  },
  icon: {
    width: '100%',
    height: 63,
  },
};
