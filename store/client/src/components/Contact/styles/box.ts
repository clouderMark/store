const color = 'white';
const weight = 300;
const fontSize = 25;

export const box = {
  minHeight: '610px',
  backgroundColor: '#008f38',
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '90px 0 90px 0',
  },
  content: {
    width: '43.9%',
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
    color: 'white',
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
