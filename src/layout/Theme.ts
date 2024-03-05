import { blue, green } from "@mui/material/colors";
import { createTheme } from '@mui/material/styles';

export const getTheme = () => {
    return createTheme({
        palette: {
            primary: {
              main: blue[700],
            },
            secondary: {
              main: green[500],
            },
        },
        shape: {
            borderRadius: 0
        },
        typography:{
            h1: {
                fontSize: '2.125rem',
                fontWeight: 400
              },
              h2: {
                fontSize: '1.5rem',
                fontWeight: 400
              },
              overline: {
                fontFamily: '"Roboto Mono", "Courier New", Courier, monospace',
                textTransform: 'none'
              }
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                padding: "2px 20px",
              }              
            }
          }
        }     
    })

}