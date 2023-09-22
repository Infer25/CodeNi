//import { ColorFondoMadera } from "@/shared/utils/color";
import {
  Box,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavbarMenu } from "../navBarMenu";
import { useStoreGlobal } from "@/shared/zustand/store";


export const SideBar: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery<boolean>(theme.breakpoints.down("md"));

  const { menuState,changeStateMenu } = useStoreGlobal((state) => ({
    menuState: state.stateMenu,
    changeStateMenu: state.chsngeStateMenu,
  }));


  return (
    <Drawer
      open={celular ? !menuState : menuState}
      anchor="left"
      variant={celular ? "temporary" : "persistent"}
      onClose={changeStateMenu}
      PaperProps={{
        sx: {
          //backgroundImage: ColorFondoMadera,
          bgcolor:theme.palette.secondary.main,
          color: "white",
          zIndex:0,
          width:{
            xs:'95%',
            sm:'24rem',
            md:'19rem'
          },
          //bgcolor:theme.palette.primary.dark,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
         
          },

          margin: {
            xs: 1,
            sm: 1,
            md: 0,
          },
          borderRadius: {
            xs: 1,
            sm: 1,
            md: 0,
          },

          height: {
            xs: "95%",
            sm: "95%",
            md: "100%",
          },
        },
      }}
    >
      <Stack display={"flex"} padding={1}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            bgcolor: theme.palette.primary.light,
            height: '3.5rem',
            borderRadius: 1,
          }}
        >
          <Typography variant="body1" color={theme.palette.common.white}>
            {"AGROGRAIN"}
          </Typography>
        </Box>

        <Stack /*alignItems={"center"}*/  >
          <NavbarMenu />
        </Stack>
      </Stack>
    </Drawer>
  );
};
