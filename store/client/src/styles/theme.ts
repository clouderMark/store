import {createTheme, PaletteColorOptions, PaletteColor, lighten} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    first?: PaletteColorOptions;
    second?: PaletteColorOptions;
    third?: PaletteColorOptions;
  }

  interface Palette {
    first: PaletteColor;
    second: PaletteColor;
    third: PaletteColor;
  }

  interface ButtonPropsColorOverrides {
    first: true;
    second: true;
    third: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    first: true;
    second: true;
    third: true;
  }
}

const globalTheme = createTheme({
  palette: {
    first: {
      main: '#008f38',
    },
    second: {
      main: '#a3d8dd',
    },
    third: {
      main: '#fff',
      light: lighten('#fff', 0.6),
    },
  },
});

export const theme = createTheme({
  palette: {
    first: {
      main: globalTheme.palette.first.main,
    },
    second: {
      main: globalTheme.palette.second.main,
    },
    third: {
      main: globalTheme.palette.third.main,
      light: globalTheme.palette.third.light,
    },
  },
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
          props: {variant: 'contained', color: 'first'},
          style: {
            backgroundColor: globalTheme.palette.first.main,
            borderRadius: 0,
            height: '54px',
            padding: '25px',
            color: globalTheme.palette.third.main,

            '&:hover': {
              backgroundColor: '#007146',
              color: globalTheme.palette.third.main,
            },
          },
        },
        {
          props: {variant: 'contained', color: 'second'},
          style: {
            backgroundColor: globalTheme.palette.second.main,
            borderRadius: 0,
            height: '54px',
            padding: '25px',
            color: '#292929',

            '&:hover': {
              backgroundColor: globalTheme.palette.third.main,
            },
          },
        },
        {
          props: {variant: 'contained', color: 'third'},
          style: {
            height: '54px',
            padding: '25px',
            backgroundColor: globalTheme.palette.third.main,
            borderRadius: 0,
            color: globalTheme.palette.first.main,
            '&:hover': {
              backgroundColor: globalTheme.palette.third.light,
              color: globalTheme.palette.first.main,
            },
            '&:active': {
              backgroundColor: globalTheme.palette.third.main,
              color: globalTheme.palette.first.main,
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
