import {theme} from '../../../styles/theme';

export const bar = {
  title: {
    marginBottom: '15px',
    color: theme.palette.first.main,
    fontWeight: 500,
    textTransform: 'uppercase',
    '&.Mui-focused': {
      color: theme.palette.first.main,
    },
  },
  text: {
    marginRight: '15px',
    fontWeight: 400,
    textTransform: 'capitalize',
    '&:hover': {
      color: theme.palette.first.main,
    },
  },
  divider: {
    borderBottomWidth: 1.5,
    marginBottom: '35px',
  },
  control: {
    marginBottom: '30px',
  },
};
