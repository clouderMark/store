import bg from '../../../image/bg1.png';

export const slider = {
  container: {
    display: 'flex',
    height: '365px',
    marginBottom: '100px',
  },

  info: {
    zIndex: 1,
    height: '100%',
    width: '33.3%',
    padding: '55px 60px 67px',
    backgroundColor: '#008f38',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '-55px',

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

    navigation: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      marginTop: 'auto',
    },

    count: {
      color: 'white',
      fontWeight: 400,
      fontSize: '1.6rem',
      lineHeight: 1.2,
    },
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    fontWeight: 300,
    fontSize: '1.875rem',
    lineHeight: 1.2,

    span: {
      marginBottom: '18px',
      fontWeight: 500,
      fontSize: '18px',
    },
  },

  box: {
    width: '66.6%',
  },

  wrapper: {
    overflow: 'hidden',
  },

  list: {
    display: 'flex',
    width: '2790px',
    height: '100%',
    padding: '0 0 1px',

    item: {
      width: '292px',
      height: '100%',
      marginLeft: '18px',
      padding: 0,
      color: 'white',
    },

    card: {
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
      height: '202px',
    },

    content: {
      padding: '36px 27px 33px',
    },

    title: {
      marginBottom: '29px',
      fontWeight: 300,
      fontSize: '25px',
      textTransform: 'uppercase',
      color: '#6f6f6f',
    },
  },
};
