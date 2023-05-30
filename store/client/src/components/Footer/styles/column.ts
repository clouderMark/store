import {theme} from '../../../styles/theme';
import {tabletSize} from '../query';

const color = theme.palette.fourth.main;
const colorHover = theme.palette.first.main;

export const column = {
  color: color,
  minHeight: '278px',

  [`@media (max-width: ${tabletSize}px)`]: {
    minHeight: 'auto',
    paddingBottom: '20px',
  },

  title: {
    fontWeight: 700,
    fontSize: '20px',

    [`@media (max-width: ${tabletSize}px)`]: {
      fontWeight: 400,
    },

    thin: {
      fontWeight: 500,
    },
  },

  item: {
    '&:hover': {
      color: colorHover,
    },
    '&:active': {
      textDecoration: 'underline',
    },
  },

  button: {
    color: 'inherit',
    marginBottom: '40px',
  },

  contacts: {
    marginTop: '30px',

    link: {
      color: color,

      '&:hover': {
        color: colorHover,
      },
    },
  },
};
