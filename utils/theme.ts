'use client'
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
      primary: {
        main: '#2B3C84',
      },
      secondary: {
        main: '#2b3ccb',
      },
      error: {
        main: red.A400,
      },
    },
  });
  
  export default theme;