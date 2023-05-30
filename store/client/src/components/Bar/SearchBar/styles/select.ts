import {theme} from '../../../../styles/theme';

export const select = {
  conrol: {
    width: '189px',
    marginLeft: '15px',
  },
  select: {
    heigth: '56px',
    width: '189px',
    color: theme.palette.fourth.main,
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.first.main,
    },
  },
};
