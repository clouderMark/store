import {queryTablet, querySmallTablet} from '../../query';
import {slider} from '../../styles/slider';

export const fotoCard = {
  card: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '45px 45px 44px 55px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },

  box: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  toParrentButton: {
    marginBottom: '50px',
    fontSize: '30px',
    color: slider.color1,
    borderBottom: '1px solid rgba(255,255,255,.3)',
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: slider.color2,
    },

    [`@media (max-width: ${queryTablet}px)`]: {
      fontSize: '2.1vw',
    },

    [`@media (max-width: ${querySmallTablet}px)`]: {
      fontSize: '20px',
    },
  },

  button: {
    color: slider.color1,
    borderBottom: '1px solid rgba(255,255,255,.3)',
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: slider.color2,

      '& i': {
        '&::before': {
          borderColor: slider.color2,
          background: slider.color2,
        },
      },
    },

    [`@media (max-width: ${queryTablet}px)`]: {
      fontSize: '1.3vw',
    },
  },
};
