import { useStoreGlobal } from "@/shared/zustand/store";
import MenuIcon from "@mui/icons-material/Menu";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { itemNavPage } from "./item";
//import { ColorFondoMadera } from "@/shared/utils/color";

import logo from '@/assets/logo.jpeg';
export const NavPage: React.FC<{}> = () => {
  const { changeTheme, stateTheme } = useStoreGlobal((state) => ({
    changeTheme: state.chsngeState,
    stateTheme: state.theme,
  }));

  const theme = useTheme();

  return (
    <Box component={"header"}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
           // alignItems: "center",
            //backgroundImage: ColorFondoMadera,
            //bgcolor:theme.palette.secondary.main  ,
            //color:theme.palette.secondary.light
            
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:1,
              
            }}
          >
            <Avatar
            src={logo}
            sx={{ alignSelf: "center", height: "3.5rem", width: "3.5rem"}}
        />
            <Typography variant="body1">{"AGROGRAIN"}</Typography>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              
            }}
          >
            {itemNavPage.map((x) => (
              <Typography
                variant="body1"
           
                sx={{
                  
                  ":hover": {
                   // bgcolor: theme.palette.primary.light,
                   // transitionDuration: ".8s",
                   // borderRadius: 1,
                  },
                  cursor: "-webkit-grab",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                key={x.id}
              >
                <Link
                  to={x.ruta}
                  style={{
                    textDecoration: "none",
                    color:theme.palette.common.white,
                  }}
                >
                  {" "}
                  {x.titulo}
                </Link>
            
              </Typography>
            ))}
            <Tooltip title="Cambiar tema">
              <IconButton onClick={changeTheme}>
                {stateTheme ? (
                  <NightlightIcon sx={{ color: theme.palette.common.white}} />
                ) : (
                  <WbSunnyIcon sx={{ color: theme.palette.common.white}} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <IconButton
            aria-label="Menu"
            onClick={() => console.log("")}
            color="inherit"
            sx={{
              display: {
                xs: "flex",
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
