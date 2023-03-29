import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#6f6f6f',
          fontWeight: 400,
          fontSize: '1.125rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'trasparent',
            color: 'inherit',
          },
        },
      },
      variants: [
        {
          props: {variant: 'contained', color: 'primary'},
          style: {
            backgroundColor: '#008f38',
            borderRadius: 0,
            height: '54px',
            padding: '25px',
            color: 'white',

            '&:hover': {
              backgroundColor: '#007146',
              color: 'white',
            },
          },
        },
        {
          props: {variant: 'contained', color: 'secondary'},
          style: {
            backgroundColor: '#a3d8dd',
            borderRadius: 0,
            height: '54px',
            padding: '25px',
            color: '#292929',

            '&:hover': {
              backgroundColor: 'white',
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          maxWidth: '1400px',
          boxShadow: 'none',
          position: 'sticky',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0 !important',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1448px',
        },
      },
    },
  },
});
