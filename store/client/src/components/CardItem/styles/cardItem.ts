const queryTablet = 1425;
const queryMobile = 767;
const querySmallTablet = 1023;

export const cardItem = {
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

    '@media (max-width: 650px)': {
      padding: '2px 20px 2px',
    },

    '@media (max-width: 410px)': {
      '& i': {
        width: '20px',
        height: '20px',

        '&::after': {
          top: '6px',
          left: '5px',
        },
      },
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
};
