export const centeredContainer = {
  padding: '121px 0 50px',
  backgroundColor: '#daeaec',

  container: {
    maxWidth: '1278px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  header: {
    marginBottom: '43px',
    fontWeight: '300',
    fontSize: '30px',
  },

  content: {
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '18px',
  },

  images: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& img': {
      margin: '16px',
      height: '83px',
    },
  },
};
