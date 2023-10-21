import { Pagination, Stack } from "@mui/material";
import React from "react";
import { ModelPaginacion } from ".";

export const CustomPaginacion: React.FC<ModelPaginacion> = ({
  cantidadElemento,
  fila,
  pagina,
  setPagina,
}) => {
  const increment = (values: number) => {
    setPagina(values);
  };

  const handleChangePaginacion = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    increment(value);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        mb:2
      }}
    >
      <Pagination
        count={Math.ceil(Number(cantidadElemento / fila))}
        page={pagina}
        onChange={handleChangePaginacion}
        color="primary"
        variant="text"
        size="large"
      />
    </Stack>
  );
};
