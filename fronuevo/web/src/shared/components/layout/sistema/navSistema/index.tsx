import { AvatarCustom } from "@/shared/components/avatar";

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tooltip,
  Badge,
  Avatar,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
//import { ColorFondoMadera } from "@/shared/utils/color";
import { useStoreGlobal } from "@/shared/zustand/store";
export const NavSistema: React.FC<{}> = () => {
  const theme = useTheme();

  const { changeMenuState } = useStoreGlobal((state) => ({
    changeMenuState: state.chsngeStateMenu,
  }));
  return (
    <AppBar
      position="relative"
      elevation={1}
      sx={{
        height: "9%",
        minWidth: "350px",
        bgcolor: theme.palette.secondary.main,
        display:'flex',
        justifyContent:'center'
    
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          //bgcolor: theme.palette.secondary.main,
        }}
      >
        <IconButton onClick={changeMenuState}>
          <MenuIcon
            sx={{ color: theme.palette.primary.main }}
            fontSize="large"
          />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Notificaciones">
            <IconButton>
              <Badge color={"primary"} variant="standard" badgeContent={4}>
                <NotificationsIcon fontSize="large" color="action" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Mensajes">
            <IconButton>
              <Badge color="primary" variant="standard" badgeContent={4}>
                <MailIcon fontSize="large" color="action" />
              </Badge>
            </IconButton>
          </Tooltip>
          <AvatarCustom
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="B"
              //src={l}
              sx={{ width: "3rem", height: "3rem", color: "white" }}
            />
          </AvatarCustom>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
