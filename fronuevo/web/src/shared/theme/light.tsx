import { createTheme } from "@mui/material";

const colorTheme = {
  principal: "#009431",
  secundario: "#009431",
  backGroud: "#FBF8EE",
  tierra: "#7A502F",
  secundarioMain: "#EAEFF2",
  secundarioLight: "#009431",
  colorBoton: "",
};

export const Light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colorTheme.secundario,
      light: colorTheme.secundario,
      dark: colorTheme.tierra,
    },

    secondary: {
      main: colorTheme.secundarioMain,
      light: colorTheme.secundarioLight,
      dark: colorTheme.backGroud,
    },
  },
  typography: {
    fontFamily: "roboto,sans-serif",

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
            color: colorTheme.principal,
          },
          "& MuiInput-underline:after": {
            borderColor: colorTheme.principal, // - Set the Input border
          },
          "& .MuiOutlinedInput-root": {
            // - The Input-root, inside the TextField-root
            

            "& fieldset": {
              // - The <fieldset> inside the Input-root
            //  borderColor: colorTheme.principal, // - Set the Input border
            },
            "&:hover fieldset": {
              borderColor: colorTheme.principal, // - Set the Input border
              color: "white",
            },
            "&.Mui-focused fieldset": {
              // - Set the Input border when parent is focused
              borderColor: colorTheme.principal, // - Set the Input border
              borderWidth: 1,
            },
            ".MuiInputBase-input": {
              // background: colorTheme.backGroud,
              borderRadius: 2.8,
            },
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-notchedOutline": {
            //borderColor: "#2980B9",
            fontSize: "1.4rem",
            
          },
          fontSize: "1.3rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontWeight: "bold",
          color: "white",
          width: "10rem",
          background: colorTheme.principal,
          fontSize: "1.2rem",
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
          fontSize: "1.2rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          //color:'black',
          fontSize: "1.4rem",
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
    MuiSelect:{
      
      styleOverrides:{
        root:{
     
         
          
        
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1367,
      xl: 1536,
    },
  },
});
