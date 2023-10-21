import { PrivateRoutes } from "@/routes/routes";
import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { CerrarBtn } from "@/shared/components/cerrar";
import { ModelFrmEstadoCivilFormulario } from "@/shared/zustand/slice/frmEstadoCivil";
import { useStoreGlobal } from "@/shared/zustand/store";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateEstadoCivil } from "../query";

export const FrmActualizarEstadoCivil: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ModelFrmEstadoCivilFormulario>();

  const { id, nombre, descripcion } = useStoreGlobal((state) => ({
    id: state.idFrmEstadoCivilActualizar,
    nombre: state.nombreFrmEstadoCivilActualizar,
    descripcion: state.descripcionFrmEstadoCivilActualizar,
  }));

  const { mutate: actualizar } = useUpdateEstadoCivil();

  useEffect(() => {
    setValue("num_estado_civil", id);
    setValue("nombre", nombre);
    setValue("descripcion", descripcion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: ModelFrmEstadoCivilFormulario) => {
    if (
      data.nombre != "" &&
      data.descripcion != "" &&
      data.num_estado_civil != 0
    ) {
      actualizar(data);
      reset();
      navigate(
        `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATESTADOCIVIL}`
      );
    } else {
      alert("no valido");
    }
  };
  const limpiar = () => {
    setValue("nombre", "");
    setValue("descripcion", "");
  };

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Actualizacion de estado civil"
        children={
          <CerrarBtn
            ruta={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATESTADOCIVIL}`}
          />
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
            gap: 1,
          }}
        >
          <Controller
            name="nombre"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="EstadoCivil"
                label="EstadoCivil"
                size="medium"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.nombre ? true : false}
                helperText={errors.nombre ? "Por favor completar el campo" : ""}
                type="search"
                autoComplete="off"
                placeholder=" Nombre del EstadoCivil"
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
                id="EstadoCivilDescripcion"
                label="Descripcion"
                size="small"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.descripcion ? true : false}
                helperText={
                  errors.descripcion ? "Por favor completar el campo" : ""
                }
                type="search"
                autoComplete="off"
                placeholder="Descripcion del EstadoCivil"
                multiline
                rows={celular ? 5 : 10}
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              flexGrow: 1,
              mb: 1,
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
