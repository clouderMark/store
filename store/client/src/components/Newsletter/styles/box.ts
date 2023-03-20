import bg1 from '../../../image/bg1.png';
import bg2 from '../../../image/bg2.png';

const height = 54;
const color = 'white';
const colorButton = '#1a9a4c';
const colorButtonHover = '#007146';
const tabletSize = 1429;
const lowTableSize = 1023;
const mobile = 574;

export const box = {
  padding: '99px 0 101px',
  backgroundColor: '#a3d8dd',
  backgroundImage: `url(${bg1}), url(${bg2})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 -130px, right -15px',

  [`@media (max-width: ${tabletSize}px)`]: {
    backgroundImage: 'none',
  },

  box: {
    display: 'flex',
  },

  container: {
    display: 'flex',

    [`@media (max-width: ${tabletSize}px)`]: {
      alignItems: 'center',
    },
    [`@media (max-width: ${lowTableSize}px)`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  img: {
    width: '80px',
  },

  imgInner: {
    marginRight: '4%',
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    color: '#292929',
    fontSize: '36px',
    fontWeight: 300,
    lineHeight: '41px',
  },

  titleTop: {
    marginBottom: '11px',
    color: '#008f38',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  form: {
    display: 'flex',
    paddingTop: '26px',

    [`@media (max-width: ${tabletSize}px)`]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [`@media (max-width: ${lowTableSize}px)`]: {
      flexDirection: 'row',
      marginTop: '10px',
    },
    [`@media (max-width: ${mobile}px)`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
    },
  },

  inputText: {
    width: '243px',
    '& .MuiInputBase-root': {
      height: `${height}px`,
      color: '#6f6f6f',
      backgroundColor: color,
      fontSize: '18px',
      fontWeight: '20px',
      borderRadius: 0,
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.6)',
        fontSize: '18px',
      },
      '&:hover fieldset': {
        borderColor: colorButton,
        borderWidth: '2px',
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colorButtonHover,
        },
      },
    },
  },

  button: {
    height: `${height}px`,
    paddingLeft: '30px',
    paddingRight: '30px',
    backgroundColor: colorButton,
    borderRadius: 0,
    color: color,
    '&:hover': {
      color: color,
      backgroundColor: colorButtonHover,
    },

    [`@media (max-width: ${tabletSize}px)`]: {
      marginLeft: '-10px',
      marginTop: '40px',
    },
    [`@media (max-width: ${lowTableSize}px)`]: {
      marginLeft: '20px',
      marginTop: 0,
    },
    [`@media (max-width: ${mobile}px)`]: {
      marginLeft: 0,
      marginTop: '40px',
      width: '100%',
    },
  },
};