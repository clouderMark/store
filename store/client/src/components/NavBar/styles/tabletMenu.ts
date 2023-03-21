import {queryMenu} from '../queryMenu';

export const tabletMenu = {
  paper: {
    marginTop: '28px',
    boxShadow: '0 0 1px 0 #6f6f6f',
    width: '100%',
    maxWidth: '100%',
  },

  box: {
    pt: 0.7,
    [`@media (max-width: ${queryMenu}px)`]: {
      pt: 0,
    },
  },

  fullWidth: {
    left: 0,
    right: 0,
  },

  icon: {
    height: 63,
  },

  button: {
    justifyContent: 'flex-start',
  },

  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
  },

  submenu: {
    marginLeft: '10px',

    item: {
      height: '100%',
      color: '#6f6f6f',
    },
  },
};

const hover = {
  '&:hover': {
    color: '#008f38',
  },
};

const fullWidth = {
  width: '100%',
};

const dFlex = {
  display: 'flex',
};

Object.assign(tabletMenu.button, hover);
Object.assign(tabletMenu.button, fullWidth);
Object.assign(tabletMenu.button, dFlex);

Object.assign(tabletMenu.submenu.item, hover);
Object.assign(tabletMenu.submenu, fullWidth);
Object.assign(tabletMenu.submenu.item, fullWidth);
Object.assign(tabletMenu.submenu.item, dFlex);

Object.assign(tabletMenu.fullWidth, fullWidth);
Object.assign(tabletMenu.icon, fullWidth);

Object.assign(tabletMenu.item, dFlex);
