const color = '#6f6f6f';
const queryMobile = 732;

export const twoColumns = {
  image: {
    width: '100%',
    height: 'auto',
    marginTop: '80px',
    marginBottom: '80px',

    [`@media (max-width: ${queryMobile}px)`]: {
      marginTop: 0,
    },
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '23px',
    fontWeight: 300,
    fontSize: '30px',
    color: color,
  },

  p: {
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 300,
  },
};
