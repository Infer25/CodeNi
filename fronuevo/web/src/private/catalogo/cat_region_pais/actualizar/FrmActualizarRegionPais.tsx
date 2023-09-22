import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { ModelFrmActualizarRegionPais } from "@/shared/zustand/slice/frmRegionPais";
import { useStoreGlobal } from "@/shared/zustand/store";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { rutaFrmActualizarRegionPais } from ".";
import { useUpdateRegionPais } from "../query";

export const FrmActualizarRegionPais: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ModelFrmActualizarRegionPais>();

  
  const { id, nombre, descripcion } = useStoreGlobal((state) => ({
    id: state.idFrmRegionPais,
    nombre: state.nombreFrmRegionPais,
    descripcion: state.descripcionFrmRegionPais,
  }));

  useEffect(() => {
    setValue("id", +id);
    setValue("nombre", nombre);
    setValue("descripcion", descripcion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: actualizar } = useUpdateRegionPais();

  const onSubmit = (data: ModelFrmActualizarRegionPais) => {
    if (
      data.nombre != "" &&
      data.descripcion != "" &&
      data.id != 0
    ) {
      actualizar(data);
      reset();
      navigate("/sistema/viewCatalogo/regionPais");
    } else {
      alert("no valido");
    }
  };

  const limpiar =()=>{
    setValue("nombre", '');
    setValue("descripcion", '');
  }
  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Actualizar region del pais"
        url={rutaFrmActualizarRegionPais}
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
            name="nombre"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="región"
                label="Región"
                size="small"
                fullWidth
                onChange={onChange}
                value={value}
                error={errors.nombre ? true : false}
                helperText={
                  errors.nombre ? "Por favor agregar una región" : ""
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
                  errors.descripcion ? "Por favor agregar una descripcion de región" : ""
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
