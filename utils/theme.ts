'use client'
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import env from '.';

// Create a theme instance.
const theme = createTheme({
    palette: {
      primary: {
        main: env.PRIMARY,
      },
      secondary: {
        main: env.SECONDARY,
      },
      error: {
        main: red.A400,
      },
    },
  });
  
  export default theme;