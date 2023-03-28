import bg from '../../../image/bg1.png';
import {queryTablet, querySmallTablet, queryMobile} from '../query';

export const slider = {
  container: {
    display: 'flex',
    height: '365px',
    marginBottom: '100px',

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
    backgroundColor: '#008f38',
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
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
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
      color: 'white',
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

  wrapper: {
    overflow: 'hidden',
  },

  list: {
    display: 'flex',
    width: '2790px',
    height: '100%',
    padding: '0 0 1px',

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
      color: 'white',
    },

    card: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      borderRadius: 0,
      margin: 0,

      '&:hover': {
        cursor: 'pointer',
        '& i': {
          '&::before': {
            backgroundColor: '#008f38',
          },
          '&::after': {
            borderColor: 'white',
          },
        },
        '& .MuiTypography-root': {
          color: '#008f38',
          textDecoration: 'underline',
        },
      },
    },

    image: {
      width: '100%',
      height: '55%',

      [`@media (max-width: ${queryMobile}px)`]: {
        height: '76%',
      },
    },

    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '36px 27px 33px',

      [`@media (max-width: ${queryTablet}px)`]: {
        padding: '24px 20px 22px',
      },
    },

    title: {
      fontWeight: 300,
      fontSize: '25px',
      textTransform: 'capitalize',
      color: '#6f6f6f',

      [`@media (max-width: ${querySmallTablet}px)`]: {
        fontSize: 'calc(1.28125rem + .375vw)',
      },
    },
  },
};
