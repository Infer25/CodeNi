import {
  Box,
  Breadcrumbs,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ModelToolBarTitle } from "./models";
//import { ColorFondoMadera } from "@/shared/utils/color";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
export const ToolBarTitle: React.FC<ModelToolBarTitle> = ({
  modulo,
  subMenu,
  children,
  url,
}) => {
  const theme = useTheme();
  const primary = {
    fontSize: "1.1rem",
    color: "White",
  };
  const secundary = {
    fontSize: "1rem",
    color: "White",
  };

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          //borderBottom: 1,
         
         

        }}
      >
        <Box
          sx={{
            //backgroundImage: ColorFondoMadera,
            borderBottomRightRadius: 40,
            bgcolor: theme.palette.primary.main,
         
          }}
        >
          <ListItemText
            primary={modulo}
            secondary={subMenu}
            primaryTypographyProps={{ style: primary }}
            sx={{ color: theme.palette.info.light, paddingX: 2 }}
            secondaryTypographyProps={{ style: secundary }}
          />
        </Box>
        <Box sx={{ p: 1 }}>{children}</Box>
      </Box>
      <Box
        sx={{
          color: theme.palette.primary.light,
          margin: 2,
          fontWeight: "bold",
          //wordSpacing: 60,
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          maxItems={2}
         
        >
          {url.map((x) => (
            <Typography key={x.id} sx={{fontSize:'1.1rem'}}>
              <Link to={x.ruta} >{x.title}</Link>
            </Typography>
          ))}
        </Breadcrumbs>
      </Box>
    </Stack>
  );
};
