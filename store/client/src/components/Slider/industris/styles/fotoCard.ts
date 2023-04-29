const color1 = 'white';
const color2 = '#008f38';

export const fotoCard = {
  card: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '45px 45px 44px 55px',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  },

  box: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '@media (max-width: 1300px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  toParrentButton: {
    marginBottom: '50px',
    fontSize: '30px',
    color: color1,
    borderBottom: '1px solid rgba(255,255,255,.3)',
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: color2,
    },
  },

  button: {
    color: color1,
    borderBottom: '1px solid rgba(255,255,255,.3)',
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: color2,

      '& i': {
        '&::before': {
          borderColor: color2,
          background: color2,
        },
      },
    },
  },
};
