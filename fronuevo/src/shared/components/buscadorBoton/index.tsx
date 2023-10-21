import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Menu,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { ModelBuscadorBoton } from "./model";
import { cantidadFilas } from "@/shared/environment";
export const BuscadorBoton: React.FC<ModelBuscadorBoton> = ({
  filtro,
  filtrar,
  criterioFiltro,
  label,
  placeholder,
  onclickGoToCrear,
  ruta,
  textFieldState,
  setComboValue,
  setPagina,
  fila,
}) => {
  const theme = useTheme();

  const [criterio, setCriterio] = useState<null | HTMLElement>(null);

  const stateCriterio = Boolean(criterio);

  const handleCloseCriterio = () => {
    setCriterio(null);
  };

  const handleClickCriterio = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCriterio(event.currentTarget);
  };

  /////////
  const setCantidadFilasPaginar = (valor: number) => {
    setComboValue({ value: valor });
    setPagina(1);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
        marginX:1
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          variant="outlined"
          label={label}
          size="small"
          value={filtro}
          onChange={(e) => filtrar(e.target.value)}
          placeholder={placeholder}
          type="search"
          autoComplete="off"
          disabled={textFieldState}
        />

        <Tooltip title="Criterio">
          <IconButton
            id="criterio"
            sx={{
              border: 1,
              borderRadius: 1,
              bgcolor: theme.palette.primary.light,
              ":hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
            size="large"
            color="primary"
            onClick={handleClickCriterio}
          >
            <FilterAltIcon sx={{ color: "white" }} fontSize="small" />
          </IconButton>
        </Tooltip>
        <Menu
          id="criterio"
          anchorEl={criterio}
          open={stateCriterio}
          onClose={handleCloseCriterio}
        >
          {criterioFiltro}
        </Menu>

        <Autocomplete
          options={cantidadFilas}
          getOptionLabel={(option) => String(option.value)}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          //defaultValue={cantidadFilas_}
          value={{ value: fila }}
          disablePortal
          disableClearable
          onChange={(_, value) => setCantidadFilasPaginar(value!.value)}
          renderInput={(params) => (
            <TextField {...params} size="small" variant="outlined" />
          )}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => onclickGoToCrear(ruta)}
      >
        nuevo
      </Button>
    </Box>
  );
};
/*

 <Tooltip title="Buscar">
          <IconButton
            sx={{
              border: 1,
              borderRadius: 1,
              bgcolor: theme.palette.primary.light,
              ":hover": {
                bgcolor: theme.palette.primary.dark,
              },
             
            }}
            size="medium"
            color="primary"
            onClick={onClick}
            disabled={textFieldState}
          >
            <SearchIcon sx={{ color: textFieldState?'gray':"white" }} fontSize="small"     />
          </IconButton>
        </Tooltip>*/
