'use client'
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
      primary: {
        main: '#A32135',
      },
      secondary: {
        main: '#831b2b',
      },
      error: {
        main: red.A400,
      },
    },
  });
  
  export default theme;