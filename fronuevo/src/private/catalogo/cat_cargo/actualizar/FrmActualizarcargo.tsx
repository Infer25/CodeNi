import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Transition } from "@/shared/components/transition";

import { ModelFrmcargoFormulario } from "@/shared/zustand/slice/frmCatCargo";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useFetchGetAllOnlyArea, useUpdatecargo } from "../query";

interface updateFrmActualizarcargo {
  state: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FrmActualizarcargo: React.FC<updateFrmActualizarcargo> = ({
  state,
  changeState,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const metodo = useFormContext<ModelFrmcargoFormulario>();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = metodo;

  const { mutate: actualizar } = useUpdatecargo();

  const onSubmit = (data: ModelFrmcargoFormulario) => {
    if (data.nombre != "" && data.descripcion != "" && data.num_cargo != 0) {
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
    setValue("num_area", 1);

  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { data } = useFetchGetAllOnlyArea();
  return (
    <Dialog
      open={state}
      maxWidth={"md"}
      TransitionComponent={Transition}
      fullWidth
      fullScreen={fullScreen}
    // sx={{ zIndex: 10000 }}
    >
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Actualizacion de cargo"
       
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
              name="num_area"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <InputLabel id="num_departamento">Departamento</InputLabel>
                  <Select
                    id="num_departamento"
                    label="Departamento"
                    size="medium"
                    onChange={onChange}
                    value={value != null ? value : ""}
                    error={errors.num_area ? true : false}
                    placeholder=" "
                    sx={{ color: "black" }}
                  >
                    {data?.rows.map((x) => (
                      <MenuItem
                        value={x.num_area}
                        key={x.num_area}
                        defaultValue={x.num_area}
                      >
                        {x.nombre_area}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.num_area ? (
                    <FormHelperText sx={{ color: "red" }}>
                      Por favor seleccione una opciòn
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              name="nombre"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="cargo"
                  label="cargo"
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
                  placeholder=" Nombre de la cargo"
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
                  id="cargoDescripcion"
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
                  placeholder="Descripcion del cargo"
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
    </Dialog>
  );
};
