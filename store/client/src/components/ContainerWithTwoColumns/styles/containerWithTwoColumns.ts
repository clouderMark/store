import {theme} from '../../../styles/theme';

export const queryMobile = 732;

export const containerWithTwoColumns = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.fourth.main,
    paddingBottom: '80px',
    marginTop: '80px',

    [`@media (max-width: ${queryMobile}px)`]: {
      flexDirection: 'column',
    },
  },
};
