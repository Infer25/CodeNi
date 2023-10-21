import { createTheme } from "@mui/material";

const colorTheme = {
  principal: "#082032",
  secundario: "#097188",
  backGroud:'#A8A8A8',
  fontWhite:'#fff',
  tierra:'#7A502F',
  secundarioMain:'#1d262f',
  secundarioLight:'fff'
};

export const Dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colorTheme.secundario,
      light: colorTheme.secundario,
      dark:colorTheme.tierra
    },
    secondary:{
      main:colorTheme.secundarioMain,
      light:colorTheme.secundarioLight
    },
    background:{
      default:colorTheme.backGroud
    }
  ,

  },
  typography: {
    fontFamily: "Verdana",

    h6: {
      fontWeight: "bold",
    },
    body1: {
      fontWeight: "bold",
    },
    body2: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            fontWeight: "bold",
            color: colorTheme.principal
          },
          "& MuiInput-underline:after":{
            borderColor: colorTheme.principal, // - Set the Input border
          },
          "& .MuiOutlinedInput-root": {
            // - The Input-root, inside the TextField-root
          
            "& fieldset": {
              // - The <fieldset> inside the Input-root
              borderColor: colorTheme.principal, // - Set the Input border
              
            },
            "&:hover fieldset": {
              borderColor: colorTheme.principal, // - Set the Input border
              color:'white'
            },
            "&.Mui-focused fieldset": {
              // - Set the Input border when parent is focused
              borderColor: colorTheme.principal, // - Set the Input border
              borderWidth: 1,
            },
            '.MuiInputBase-input':  {
              background: colorTheme.backGroud,
              borderRadius:2.8
            }
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-notchedOutline": {
            //borderColor: colorTheme.principal,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontWeight: "bold",
          color: "white",
          width: "120px",
        background: colorTheme.secundario,
        },

        text: {
          fontWeight: "bold",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: "bold",
          fontSize: "12px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: "bold",

          color:colorTheme.principal
        },
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
        padding: "normal",
        color: "black",
      },
    },
    MuiPagination: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiPaper:{
     styleOverrides:{
      root:{
        "& .MuiPaper-root":{
          backgroundColor:"#fafafa" //as an Example
        
        }
      }
     }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
