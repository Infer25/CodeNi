import { PrivateRoutes } from "@/routes/routes";
import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { useStoreGlobal } from "@/shared/zustand/store";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Box, Button, IconButton, TextField, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateState } from "../../listar/query";
import { ModeFrmActualizarEstado } from "../model";
export const FrmActualizarEstado: React.FC<{}> = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ModeFrmActualizarEstado>();
  const { id, nombre, descripcion } = useStoreGlobal((state) => ({
    id: state.id,
    nombre: state.nombre,
    descripcion: state.descripcion,
  }));

  useEffect(() => {
    setValue("numestado", +id);
    setValue("nombreestado", nombre);
    setValue("descripcion", descripcion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: actualizar } = useUpdateState();

  const onSubmit = (data: ModeFrmActualizarEstado) => {
    if (
      data.nombreestado != "" &&
      data.descripcion != "" &&
      data.numestado != 0
    ) {
      actualizar(data);
      reset();
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATESTADO}`);
    } else {
      alert("no valido");
    }
  };

  const limpiar =()=>{
    setValue("nombreestado", '');
    setValue("descripcion", '');
  }
  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Actualizacion de estado"
        children={
          <Tooltip title={"Cerrar"}>
            <IconButton
              onClick={() =>
                navigate(
                  `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATALOGOS}/estado`,
                  {
                    replace: true,
                  }
                )
              }
              size="large"
              sx={{
                border: 1,
                bgcolor: "red",
                color: "white",
                ":hover": {
                  bgcolor: "red",
                },
              }}
            />
          </Tooltip>
        }
      />

      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          sx={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Controller
            name="nombreestado"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="Nombreestado"
                label="Nombre"
                size="small"
                fullWidth
                onChange={onChange}
                value={value}
                error={errors.nombreestado ? true : false}
                helperText={
                  errors.nombreestado ? "Por favor agregar un estado" : ""
                }
                type="search"
                autoComplete="off"
              />
            )}
          />

          <Controller
            name="descripcion"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="Descripcion"
                label="Descripcion"
                size="small"
                fullWidth
                onChange={onChange}
                value={value}
                error={errors.descripcion ? true : false}
                helperText={
                  errors.descripcion ? "Por favor agregar una descripcion" : ""
                }
                type="search"
                autoComplete="off"
                multiline
                rows={
                  celular?5:10
                }    
              />
            )}
          />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<CancelIcon />}
              onClick={limpiar}
              sx={{ bgcolor: "red" }}
            >
              Limpiar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ChangeCircleIcon />}
              type="submit"
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </Box>
    </FormContainer>
  );
};
