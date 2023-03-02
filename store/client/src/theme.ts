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
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 0 1px 0 #6f6f6f',
        },
      },
    },
  },
});
