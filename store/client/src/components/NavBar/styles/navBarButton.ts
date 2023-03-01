import {queryMenu} from '../queryMenu';

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
  [`@media (max-width: ${queryMenu}px)`]: {
    fontSize: 0,
    height: '55px',
    padding: '5px',
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
