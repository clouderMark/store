import {theme} from '../../../styles/theme';

export const opinion = {
  box: {
    backgroundImage: 'linear-gradient(to bottom,#f4f4f4 10%,#fff 100%)',
    pt: '120px',
    pb: '120px',
  },

  p: {
    fontSize: '22px',
    mb: '28px',
  },

  title: {
    fontSize: '30px',
    fontWeight: 300,
  },

  list: {
    '& li': {
      mb: '10px',

      '@media (max-width: 1250px)': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },

      '@media (max-width: 732px)': {
        flexDirection: 'row',
      },

      '& p': {
        pr: '10px',
      },

      '& a': {
        textDecoration: 'none',
        color: theme.palette.first.main,
      },
    },
  },
};
