import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";

import { ModelFrmTipoTierraFormulario } from "@/shared/zustand/slice/frmTipoTierra";
import { useStoreGlobal } from "@/shared/zustand/store";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateTipoTierra } from "../query";
import { rutaFrmActualizarTipoTierra } from "./ruta";

export const FrmActualizarTipoTierra: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ModelFrmTipoTierraFormulario>();

  const { id, nombre, descripcion } = useStoreGlobal((state) => ({
    id: state.idFrmTipoTierraActualizar,
    nombre: state.nombreFrmTipoTierraActualizar,
    descripcion: state.descripcionFrmTipoTierraActualizar,
  }));

  const { mutate: actualizar } = useUpdateTipoTierra();

  useEffect(() => {
    setValue("num_tipo_tierra", id);
    setValue("nombre", nombre);
    setValue("descripcion", descripcion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: ModelFrmTipoTierraFormulario) => {
    if (
      data.nombre != "" &&
      data.descripcion != "" &&
      data.num_tipo_tierra != 0
    ) {
      actualizar(data);
      reset();
      navigate("/sistema/viewCatalogo/tipo_tierra");
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
        subMenu="Actualizacion tipo de tierra"
        url={rutaFrmActualizarTipoTierra}
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
                id="TipoTierra"
                label="Tipo de tierra"
                size="medium"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.nombre ? true : false}
                helperText={errors.nombre ? "Por favor completar el campo" : ""}
                type="search"
                autoComplete="off"
                placeholder=" Nombre del tipo de tierra"
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
                id="TipoTierradesc"
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
                placeholder="Descripcion del tipo de tierra"
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
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </FormContainer>
  );
};
