import { CssBaseline, ThemeProvider } from "@mui/material";

//import { useStoreGlobal } from "./shared/zustand/store";
import AppRouter from "./routes/appRouter";
import { Light } from "./shared/theme";

export const StyledSystem: React.FC<{}> = () => {
 /* const { tema } = useStoreGlobal((state) => ({
    tema: state.theme,
  }));*/
//tema ? Dark : 
  return (
    <ThemeProvider theme={Light}>
      <CssBaseline />
      <AppRouter/>

    </ThemeProvider>
  );
};
    //  <RouterProvider router={router} />