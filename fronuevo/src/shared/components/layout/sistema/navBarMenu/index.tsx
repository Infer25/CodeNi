import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { navLinks } from "../listItem";
import { useState } from "react";
import { useStoreGlobal } from "@/shared/zustand/store";

export const NavbarMenu: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery<boolean>(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState<string | false>(false);
  const [subMenu, setSubMenu] = useState<string>("");

  const handleChange_ = (panel: string, isExpanded: boolean) => {
    if (celular) goTo();
    setExpanded(isExpanded ? panel : false);
    if (expanded != panel) setSubMenu(panel);
  };

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);

    if (expanded == panel) {
      handleChange_(panel, false);
    }
  };

  const navigate = useNavigate();

  const to = (ruta: string) => {
    navigate(ruta);
  };
  const { goTo } = useStoreGlobal((state) => ({
    goTo: state.chsngeStateMenu,
  }));
  return (
    <List
      // disablePadding
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{
        bgcolor: theme.palette.secondary.main,

        color: theme.palette.common.black,
      }}
    >
      {navLinks.map((x) => (
        <div key={x.id}>
          <Box sx={{}}>
            <ListItemButton
              onClick={() => handleChange(x.title, true)}
              sx={{
                borderRadius: 1,
                bgcolor: x.lista.find((y) => y.title == subMenu)
                  ? theme.palette.primary.light
                  : "",

                color: x.lista.find((y) => y.title == subMenu)
                  ? theme.palette.common.white
                  : "",
                ":hover": {
                  bgcolor: x.lista.find((y) => y.title == subMenu)
                    ? theme.palette.primary.light
                    : "",
                },
                display: "flex",
                justifyContent: "space-between",
               
              }}
            >
              <ListItemIcon
                sx={{
                 
                  color: x.lista.find((y) => y.title == subMenu)
                    ? theme.palette.common.white
                    : theme.palette.primary.light,
                }}
                key={x.id}
              >
                {x.icon}
              </ListItemIcon>


              
              <ListItemText primary={x.title} />
              <Stack >
                {expanded === x.title ? (
                  <ExpandLessOutlinedIcon fontSize="medium" />
                ) : (
                  <ExpandMoreOutlinedIcon fontSize="medium" />
                )}
              </Stack>
            </ListItemButton>
          </Box>
          <Collapse
            in={expanded === x.title ? true : false}
            timeout={400}
            unmountOnExit
          >
            {x.lista.map((y) => (
              <List
                component="div"
                disablePadding
                key={y.id}
                onClick={() => handleChange_(y.title, false)}
                sx={{
                  borderLeft: 2,
                  marginLeft: 3,
                  borderColor: theme.palette.primary.light,
                }}
              >
                <ListItemButton
                  onClick={() => to(y.path)}
                  sx={{
                    display: "flex",
                    borderRadius: 1,
                    columnGap: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.secondary.light,
                      display: "flex",

                      width: "100%",

                      ":hover": {
                        color: theme.palette.common.black,
                      },
                    }}
                    key={y.id}
                  >
                    <ListItemText
                      primary={"• " + y.title}
                      sx={{
                        borderBottom: y.title == subMenu ? 2 : 0,
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </div>
      ))}
    </List>
  );
};
