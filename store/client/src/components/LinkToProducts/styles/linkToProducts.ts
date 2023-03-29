const queryMobile = 732;
const color = '#6f6f6f';

export const linkToProducts = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    color: color,
    paddingBottom: '80px',

    [`@media (max-width: ${queryMobile}px)`]: {
      flexDirection: 'column',
    },
  },

  row: {
    width: '51%',

    [`@media (max-width: ${queryMobile}px)`]: {
      width: '100%',
    },
  },

  title: {
    width: '40%',
    fontSize: '35px',
    fontWeight: 300,
    lineHeight: 1.2,

    [`@media (max-width: ${queryMobile}px)`]: {
      width: '100%',
      marginBottom: '16px',
    },
  },

  strong: {
    marginBottom: '16px',
    fontWeight: 500,
    fontSize: '20px',
  },

  p: {
    marginBottom: '16px',
    fontWeight: 300,
  },
};
