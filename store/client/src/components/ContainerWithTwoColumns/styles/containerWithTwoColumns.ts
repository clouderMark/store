const queryMobile = 732;
const color = '#6f6f6f';

export const containerWithTwoColumns = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    color: color,
    paddingBottom: '80px',

    [`@media (max-width: ${queryMobile}px)`]: {
      flexDirection: 'column',
    },
  },

  column2: {
    width: '51%',

    [`@media (max-width: ${queryMobile}px)`]: {
      width: '100%',
    },
  },

  column1: {
    width: '40%',

    [`@media (max-width: ${queryMobile}px)`]: {
      width: '100%',
      marginBottom: '16px',
    },
  },
};
