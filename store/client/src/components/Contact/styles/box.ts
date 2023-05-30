import {theme} from '../../../styles/theme';

const color = theme.palette.third.main;
const weight = 300;
const fontSize = 25;
const tabletSize = 767;
const mobileSize = 600;

export const box = {
  minHeight: '610px',
  backgroundColor: theme.palette.first.main,
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '90px 0 90px 0',
    [`@media (max-width: ${tabletSize}px)`]: {
      flexDirection: 'column',
    },
    [`@media (max-width: ${mobileSize}px)`]: {
      padding: '90px 10px 90px 10px',
    },
  },
  content: {
    width: '43.9%',
    [`@media (max-width: ${tabletSize}px)`]: {
      width: '100%',
      marginBottom: '50px',
    },
  },
  headers: {
    color: color,
    top: {
      marginBottom: '8px',
      fontWeight: 500,
      textTransform: 'uppercase',
      fontSize: '20px',
      color: color,
    },
    bottom: {
      marginBottom: '8px',
      fontWeight: weight,
      fontSize: '35px',
      lineHeight: '43px',
      color: color,
    },
  },
  paragraph: {
    marginBottom: '40px',
    fontSize: '16px',
    color: theme.palette.third.main,
    fontWeight: weight,
  },
  contacts: {
    paragraph: {
      marginBottom: '8px',
      fontSize: `${fontSize}px`,
      color: color,
      fontWeight: weight,
    },
    link: {
      fontSize: `${fontSize}px`,
      color: color,
      fontWeight: weight,
      '&:hover': {
        color: color,
        textDecorationThickness: '1px',
      },
      img: {
        fontSize: '30px',
      },
      number: {
        color: theme.palette.third.main,
        marginLeft: '10px',
        fontSize: `${fontSize}px`,
      },
    },
    working: {
      marginTop: '8px',
      marginLeft: '40px',
      color: color,
      fontSize: '16px',
      fontWeight: weight,
    },
  },
};
