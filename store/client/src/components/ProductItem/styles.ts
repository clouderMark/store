const tabletSize = 767;

export const card = {
  card: {
    width: '31.66%',
    marginBottom: '40px',
    borderRadius: 0,
    cursor: 'pointer',
    color: '#6f6f6f',
    '&:hover': {
      color: '#008f38',
    },
    [`@media (max-width: ${tabletSize}px)`]: {
      width: '48.5%',
    },
  },
  img: {
    width: '100%',
    maxHeight: '230px',
    [`@media (max-width: ${tabletSize}px)`]: {
      maxHeight: '246px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '31px 21px 22px 28px',
  },
  article: {
    margin: '0 0 8px',
    fontSize: '16px',
    color: '#008f38',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  title: {
    margin: '0 0 25px',
    fontSize: '27px',
    fontWeight: 500,
  },
  solution: {
    margin: '0 0 21px',
    fontSize: '18px',
    fontWeight: 300,
  },
  price: {
    margin: '0 0 3px',
    fontSize: '26px',
    color: '#008f38',
    fontWeight: 500,
  },
  weight: {
    fontSize: '15px',
  },
  '@media (min-width: 767px)': {
    card: {
      width: '47.7%',
    },
  },
};
