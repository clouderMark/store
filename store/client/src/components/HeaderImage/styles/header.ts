import pentagon from '../image/pentagon.svg';
import {queryTablet} from '../../commonContent/queryTablet';

const queryMobile = 844;

export const header = {
  container: {
    position: 'relative',

    [`@media (max-width: ${queryTablet}px)`]: {
      marginBottom: '220px',
    },

    [`@media (max-width: ${queryMobile}px)`]: {
      marginBottom: '240px',
    },
  },

  image: {
    width: '100%',
    height: '100%',

    [`@media (max-width: ${queryTablet}px)`]: {
      maxHeight: '423px',
    },

    [`@media (max-width: ${queryMobile}px)`]: {
      maxHeight: '747px',
      height: '747px',
      objectFit: 'cover',
    },
  },

  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    marginLeft: '-51%',
    width: '50%',
    backgroundImage: `url(${pentagon})`,
    backgroundRepeat: 'no-repeat',
  },

  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-104px',
    marginLeft: '-680px',
    width: '1400px',

    '@media (max-width: 1500px)': {
      width: '500px',
      marginLeft: '-47%',
    },

    [`@media (max-width: ${queryTablet}px)`]: {
      bottom: '-160px',
      top: 'auto',
      width: '94%',
      height: '316px',
      marginLeft: '-47.8%',
      backgroundColor: '#008f38',
      padding: '49px 44px 27px',

      '&::before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '3px solid #a3d8dd',
        top: '20px',
        left: '16px',
      },
    },

    [`@media (max-width: ${queryMobile}px)`]: {
      height: '310px',
      width: '90%',
      marginLeft: '-45.5%',
    },
  },

  p: {
    marginBottom: '25px',
    color: '#a3d8dd',
    fontSize: '20px',
    fontWeight: 500,

    [`@media (max-width: ${queryTablet}px)`]: {
      marginBottom: '1.125rem',
    },
  },

  strong: {
    fontWeight: 400,
    fontSize: '40px',
    color: 'white',

    [`@media (max-width: ${queryTablet}px)`]: {
      fontSize: 'calc(1.35rem + 1.2vw)',
      lineHeight: 1.2,
    },
  },

  button: {
    marginTop: '25px',

    [`@media (max-width: ${queryTablet}px)`]: {
      marginTop: '1.125rem',
    },
  },
};
