import bg1 from '../../../image/bg1.png';
import bg2 from '../../../image/bg2.png';
import {queryTablet} from '../../commonContent/queryTablet';

export const linkList = {
  marginBottom: '100px',
  paddingTop: '11px',
  paddingBottom: '11px',
  backgroundColor: '#ddeaec',
  backgroundImage: `url(${bg1}), url(${bg2})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '190px, 260px',
  backgroundPosition: '0 -160px, right -30px',

  [`@media (max-width: ${queryTablet}px)`]: {
    backgroundImage: 'none',
  },

  list: {
    display: 'flex',

    [`@media (max-width: ${queryTablet}px)`]: {
      flexDirection: 'column',
    },
  },

  item: {
    minHeight: '222px',
    borderRight: '1px solid rgba(111,111,111,.3)',

    [`@media (max-width: ${queryTablet}px)`]: {
      paddingLeft: 0,
      borderRight: 'none',
      borderBottom: '1px solid rgba(111,111,111,.3)',
    },
  },

  itemButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',

    [`@media (max-width: ${queryTablet}px)`]: {
      paddingLeft: 0,
    },
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '23px',
    fontWeight: 300,
    fontSize: '30px',
  },

  box: {
    padding: '6.5px',
    marginBottom: 'auto',

    [`@media (max-width: ${queryTablet}px)`]: {
      paddingLeft: 0,
    },
  },

  logoContainer: {
    display: 'felx',
    marginTop: '40px',
  },

  logo1: {
    width: '200px',
    height: '83px',
    marginRight: '30px',
  },

  logo2: {
    width: '100px',
    height: '100px',
  },

  logoItem: {
    paddingLeft: '20px',
    [`@media (max-width: ${queryTablet}px)`]: {
      paddingLeft: 0,
      minHeight: '222px',
    },
  },
};
