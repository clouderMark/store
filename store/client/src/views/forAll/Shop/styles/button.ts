import {theme} from '../../../../styles/theme';

const buttonHeight = '53px';

export const button = {
  reset: {
    width: '210px',
    height: buttonHeight,
    borderColor: theme.palette.first.main,
    color: theme.palette.first.dark,
    '&:hover': {
      borderColor: theme.palette.first.dark,
      color: theme.palette.first.dark,
    },
  },
  filters: {
    width: '100%',
    height: '54px',
    marginBottom: '32px',
    backgroundColor: theme.palette.first.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.first.dark,
      color: theme.palette.third.light,
    },
  },
};

export const mockHeight = {
  height: buttonHeight,
};
