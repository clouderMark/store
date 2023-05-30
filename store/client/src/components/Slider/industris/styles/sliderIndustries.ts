import {theme} from '../../../../styles/theme';
import {queryTablet, querySmallTablet, queryMobile} from '../../query';
import {slider} from '../../styles/slider';

export const sliderIndustries = {
  container: {
    display: 'flex',
    minHeight: '621px',

    [`@media (max-width: ${queryTablet}px)`]: {
      minHeight: '40vw',
    },
    [`@media (max-width: ${queryMobile}px)`]: {
      minHeight: '55vw',
    },
  },

  square: {
    position: 'absolute',
    content: '""',
    backgroundColor: slider.color2,
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
    minHeight: '621px',
    width: '336px',
    padding: '55px 10px 3vw 0',
    backgroundColor: slider.color2,

    [`@media (max-width: ${queryTablet}px)`]: {
      paddingTop: '4vw',
      minHeight: '40vw',
    },

    [`@media (max-width: ${querySmallTablet}px)`]: {
      width: '50%',
    },

    button: slider.button,

    title: {
      color: slider.color1,
      fontWeight: 500,
      fontSize: '18px',
      textTransform: 'uppercase',
      marginBottom: '30px',

      [`@media (max-width: ${queryTablet}px)`]: {
        fontSize: '18px',
      },
    },

    list: {
      marginBottom: '30px',
      padding: '0',
      borderLeft: `1px solid ${theme.palette.third.dark})`,

      button: {
        color: slider.color1,
        fontSize: '22px',
        fontWeight: 300,

        '&:hover': {
          color: slider.color1,
          backgroundColor: theme.palette.third.dark,
        },

        [`@media (max-width: ${queryTablet}px)`]: {
          height: '2vw',
          padding: '2vw',
        },
      },
    },

    navigation: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '120px',
      marginTop: 'auto',
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

  wrapper: slider.wrapper,

  list: {
    display: 'flex',
    height: '100%',
    padding: '0 0 1px',
    transitionDuration: '.5s',
    transitionProperty: 'transform',

    [`@media (max-width: ${queryMobile}px)`]: {
      marginLeft: '-24px',
    },

    item: {
      flexGrow: 1,
      height: '100%',
      marginLeft: '18px',
      padding: 0,
      color: slider.color1,
      transitionDuration: '.5s',
      transitionProperty: 'opacity',
    },
  },
};
