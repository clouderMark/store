const color1 = 'white';
const color2 = '#008f38';

export const slider = {
  button: {
    '&:hover': {
      '& i::before': {
        backgroundColor: color1,
      },
      '& i::after': {
        borderColor: color2,
      },
    },
  },

  wrapper: {
    overflow: 'hidden',
  },

  color1: color1,
  color2: color2,
};
