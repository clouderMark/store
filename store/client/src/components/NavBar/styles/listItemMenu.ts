export const listItemMenu = {
  paper: {
    padding: '40px 25px',
    marginTop: '10px',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
    borderRadius: 0,
  },

  list: {
    '& .MuiList-root': {
      display: 'grid',
      gridTemplateRows: 'repeat(5,67px)',
      gridAutoColumns: '260px',
      gridAutoFlow: 'column',
      gridColumnGap: '40px',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    color: '#008f38',
    padding: '0 15px',

    '&:hover': {
      color: '#008f38',
    },

    wrapper(length: number) {
      return {
        width: '259px',
        padding: 0,
        gridColumn: `1 / span ${Math.ceil(length / 4)}`,
      };
    },
  },

  item: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '0 15px',
    color: '#6f6f6f',
    textTransform: 'capitalize',

    '& svg': {
      display: 'none',
    },

    '&:hover': {
      color: '#008f38',

      '& svg': {
        display: 'block',
      },
    },

    wrapper: {
      padding: 0,
    },
  },
};
