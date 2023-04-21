export const queryMobile = 732;
const color = '#6f6f6f';

export const containerWithTwoColumns = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    color: color,
    paddingBottom: '80px',
    marginTop: '80px',

    [`@media (max-width: ${queryMobile}px)`]: {
      flexDirection: 'column',
    },
  },
};
