import { useStoreGlobal } from "@/shared/zustand/store";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavSistema } from "./navSistema";
import { SideBar } from "./sideBar";
const Sistema: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("md"));
  const { menuState } = useStoreGlobal((state) => ({
    menuState: state.stateMenu,
  }));

  return (
    <Stack
      sx={{
        // bgcolor: theme.palette.secondary.main,

        minWidth: "370px",
      }}
      height={"100vh"}
    >
      <SideBar />

      <Stack
        sx={{
          marginLeft: menuState && !celular ? "18rem" : 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <NavSistema />

        <Box
          sx={{
            //minWidth: "350px",
            height: "89%",
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Sistema;
