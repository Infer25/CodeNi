import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Transition } from "@/shared/components/transition";


import { ModelFrmcategoria_proveedorFormulario } from "@/shared/zustand/slice/frmCatCategoriaProveedor";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useUpdatecategoria_proveedor } from "../query";


interface updateFrmActualizarcategoria_proveedor {
  state: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FrmActualizarcategoria_proveedor: React.FC<updateFrmActualizarcategoria_proveedor> = ({
  state,
  changeState,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const metodo = useFormContext<ModelFrmcategoria_proveedorFormulario>();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = metodo;

  const { mutate: actualizar } = useUpdatecategoria_proveedor();

  const onSubmit = (data: ModelFrmcategoria_proveedorFormulario) => {
    if (
      data.nombre != "" &&
      data.descripcion != "" &&
      data.num_categoria_proveedor != 0
    ) {
      actualizar(data);
      limpiar();
    } else {
      alert("no valido");
    }
  };
  const limpiar = () => {
    changeState(false)
    setValue("nombre", "");
    setValue("descripcion", "");
  };

  const limpiar_ = () => {
    setValue("nombre", "");
    setValue("descripcion", "");
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={state}
      maxWidth={"md"}
      TransitionComponent={Transition}
      fullWidth
      fullScreen={fullScreen}

    >
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Actualizacion de categoria-proveedor"
        
          children={
            <IconButton
              onClick={limpiar}
              size="small"
              sx={{
                border: 1,
                bgcolor: "red",
                color: "white",
                ":hover": {
                  bgcolor: "red",
                },
              }}
            >
              <CloseSharpIcon />
            </IconButton>
          }
        />
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: "100%",
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
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="Namecategoria_proveedor"
                  label="Categoria del proveedor"
                  size="medium"
                  //fullWidth
                  onChange={onChange}
                  value={value}
                  error={errors.nombre ? true : false}
                  helperText={
                    errors.nombre ? "Por favor completar el campo" : ""
                  }
                  type="search"
                  autoComplete="off"
                  placeholder=" Nombre de la categoria proveedor"
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
                  id="rolDescripcion"
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
                  placeholder="Descripcion del categoria proveedor"
                  multiline
                  rows={celular ? 12 : 10}
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
                onClick={limpiar_}
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
    </Dialog>
  );
};
