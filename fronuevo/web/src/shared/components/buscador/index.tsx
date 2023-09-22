import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { ModelBuscador } from "./model";
export const Buscador: React.FC<ModelBuscador> = ({ filtro, filtrar }) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{margin:1,display:'flex',justifyContent:celular?'center':'start'}}>
      <TextField
        variant="outlined"
        label="Filtrar"
        size="small"
        value={filtro}
        onChange={(e) => filtrar(e.target.value)}
        //fullWidth={celular?true:false}
    
      />
    </Box>
  );
};
