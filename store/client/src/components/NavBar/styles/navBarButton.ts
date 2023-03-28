import {queryTablet} from '../../../commonContent/queryTablet';
import {queryMobile} from '../query';

export const button = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '95px',
  padding: '10px 10px',
  marginLeft: '15px',
  textTransform: 'none',
  fontWeight: 'normal',
  fontSize: '14px',
  svg: {
    color: '#008f38',
  },
  '&:hover': {
    '.box': {
      backgroundColor: '#008f38',
    },
    svg: {
      color: 'white',
    },
  },
  [`@media (max-width: ${queryTablet}px)`]: {
    fontSize: 0,
    height: '55px',
    padding: '5px',
  },

  [`@media (max-width: ${queryMobile}px)`]: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
  },

  '&.active': {
    '.box': {
      backgroundColor: '#008f38',
    },
    svg: {
      color: 'white',
    },
  },
};

export const box = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
};
