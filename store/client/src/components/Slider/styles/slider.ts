import {theme} from '../../../styles/theme';

const color1 = theme.palette.third.main;
const color2 = theme.palette.first.main;

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
