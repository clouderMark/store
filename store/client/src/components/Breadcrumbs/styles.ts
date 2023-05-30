import {theme} from '../../styles/theme';

export const styles = {
  notLast: {
    color: theme.palette.first.main,
    '&:hover': {
      color: theme.palette.first.main,
    },
  },
  last: {
    color: theme.palette.fourth.light,
  },
};
