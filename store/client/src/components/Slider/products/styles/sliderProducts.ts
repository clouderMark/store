import bg from '../../../../image/bg1.png';
import {queryTablet, querySmallTablet, queryMobile} from '../../query';
import {slider} from '../../styles/slider';

export const sliderProducts = {
  container: {
    display: 'flex',
    height: '365px',

    [`@media (max-width: ${queryTablet}px)`]: {
      height: '25.8vw',
    },

    [`@media (max-width: ${querySmallTablet}px)`]: {
      height: '30vw',
    },

    [`@media (max-width: ${queryMobile}px)`]: {
      height: '71.5vw',
      paddingLeft: 0,
    },
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
    height: '100%',
    width: '33.3%',
    padding: '55px 60px 67px',
    backgroundColor: slider.color2,
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '-55px',

    [`@media (max-width: ${queryTablet}px)`]: {
      padding: '40px 40px 37px',
    },

    [`@media (max-width: ${querySmallTablet}px)`]: {
      width: '50%',
      padding: '55px 40px 37px',
    },

    button: slider.button,

    title: {
      display: 'flex',
      flexDirection: 'column',
      color: slider.color1,
      fontWeight: 300,
      fontSize: '30px',
      lineHeight: 1.2,

      [`@media (max-width: ${queryTablet}px)`]: {
        fontSize: 'calc(1.3125rem + .75vw)',
      },

      span: {
        marginBottom: '6%',
        fontWeight: 500,
        fontSize: '18px',
      },
    },

    navigation: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    count: {
      color: slider.color1,
      fontWeight: 400,
      fontSize: '1.6rem',
      lineHeight: 1.2,
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
    width: '2790px',
    height: '100%',
    padding: '0 0 1px',
    transitionDuration: '.5s',
    transitionProperty: 'transform',

    [`@media (max-width: ${queryTablet}px)`]: {
      width: '196vw',
    },

    [`@media (max-width: ${querySmallTablet}px)`]: {
      width: '217vw',
    },

    [`@media (max-width: ${queryMobile}px)`]: {
      width: '753vw',
    },

    item: {
      width: '10.466%',
      height: '100%',
      marginLeft: '18px',
      padding: 0,
      color: slider.color1,
      transitionDuration: '.5s',
      transitionProperty: 'opacity',
    },
  },
};
