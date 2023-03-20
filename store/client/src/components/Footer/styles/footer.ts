import {tabletSize, mobileSize} from '../query';

export const footer = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '90px 0 0',

  [`@media (max-width: ${tabletSize}px)`]: {
    justifyContent: 'space-between',
  },

  [`@media (max-width: ${mobileSize}px)`]: {
    flexDirection: 'column',
  },

  column: {
    width: '74%',
    display: 'flex',
    justifyContent: 'space-between',

    [`@media (max-width: ${tabletSize}px)`]: {
      flexDirection: 'column',
      width: 'auto',
      marginRight: '15%',
    },

    address: {
      [`@media (max-width: ${mobileSize}px)`]: {
        marginLeft: '13px',
      },
    },
  },

  divider: {
    marginTop: '57px',
    marginBottom: '10px',
    borderBottomWidth: 1.5,
  },

  social: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
};
