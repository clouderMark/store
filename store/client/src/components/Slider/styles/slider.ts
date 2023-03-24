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

  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    marginTop: 'auto',
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
    backgroundColor: 'red',
    padding: '0 0 1px',
  },

  item: {
    width: '292px',
    height: '100%',
    marginLeft: '18px',
    backgroundColor: 'blue',
    color: 'white',
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

  count: {
    color: 'white',
    fontWeight: 400,
    fontSize: '1.6rem',
    lineHeight: 1.2,
  },
};
