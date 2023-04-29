import {queryTablet, querySmallTablet, queryMobile} from '../query';

export const sliderProducts = {
  container: {
    display: 'flex',
    height: '621px',
  },

  square: {
    position: 'absolute',
    content: '""',
    backgroundColor: '#008f38',
    width: '200%',
    top: 0,
    bottom: 0,
    left: '-200%',
  },

  info: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    height: '100%',
    width: '336px',
    padding: '55px 10px 67px 0',
    backgroundColor: '#008f38',

    // [`@media (max-width: ${queryTablet}px)`]: {
    //   padding: '40px 40px 37px',
    // },

    [`@media (max-width: ${querySmallTablet}px)`]: {
      width: '50%',
      padding: '55px 40px 37px',
    },

    button: {
      '&:hover': {
        '& i::before': {
          backgroundColor: 'white',
        },
        '& i::after': {
          borderColor: '#008f38',
        },
      },
    },

    title: {
      color: 'white',
      fontWeight: 500,
      fontSize: '18px',
      textTransform: 'uppercase',
      marginBottom: '30px',

      [`@media (max-width: ${queryTablet}px)`]: {
        fontSize: '18px',
      },
    },

    list: {
      marginBottom: 'auto',
      padding: '0',
      borderLeft: '1px solid rgba(255,255,255,.27)',

      button: {
        color: 'white',
        fontSize: '22px',
        fontWeight: 300,

        '&:hover': {
          color: 'white',
          backgroundColor: 'rgba(255,255,255, .3)',
        },

        [`@media (max-width: ${queryTablet}px)`]: {
          fontSize: '18px',
        },
      },
    },

    navigation: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '120px',
    },
  },

  box: {
    width: '66.6%',

    [`@media (max-width: ${querySmallTablet}px)`]: {
      width: '50%',
    },

    [`@media (max-width: ${queryMobile}px)`]: {
      width: '100%',
    },
  },

  wrapper: {
    overflow: 'hidden',
  },

  list: {
    display: 'flex',
    height: '100%',
    padding: '0 0 1px',
    transitionDuration: '.5s',
    transitionProperty: 'transform',

    item: {
      flexGrow: 1,
      height: '100%',
      marginLeft: '18px',
      padding: 0,
      color: 'white',
      transitionDuration: '.5s',
      transitionProperty: 'opacity',
    },
  },
};
