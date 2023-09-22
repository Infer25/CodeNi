import { CssBaseline, ThemeProvider } from "@mui/material";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
//import { useStoreGlobal } from "./shared/zustand/store";
import { Light } from "./shared/theme";

export const StyledSystem: React.FC<{}> = () => {
 /* const { tema } = useStoreGlobal((state) => ({
    tema: state.theme,
  }));*/
//tema ? Dark : 
  return (
    <ThemeProvider theme={Light}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
