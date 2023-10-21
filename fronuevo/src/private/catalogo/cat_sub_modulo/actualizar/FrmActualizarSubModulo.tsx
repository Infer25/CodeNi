import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Transition } from "@/shared/components/transition";
import { ModelFrmsub_moduloFormulario } from "@/shared/zustand/slice/frmCatSubModulo";
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
import { useFetchGetAllOnlyModulo, useUpdatesub_modulo } from "../query";

interface updateFrmActualizarsub_modulo {
  state: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FrmActualizarsub_modulo: React.FC<
  updateFrmActualizarsub_modulo
> = ({ state, changeState }) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const metodo = useFormContext<ModelFrmsub_moduloFormulario>();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = metodo;

  const { mutate: actualizar } = useUpdatesub_modulo();

  const onSubmit = (data: ModelFrmsub_moduloFormulario) => {
    if (
      data.nombre != "" &&
      data.descripcion != "" &&
      data.num_sub_modulo != 0
    ) {
      actualizar(data);
      limpiar();
    } else {
      alert("no valido");
    }
  };
  const limpiar = () => {
    setValue("nombre", "");
    setValue("descripcion", "");
    setValue("ruta", "");
    setValue("num_modulo", 1);
    changeState(false);
  };
  const limpiar_ = () => {
    setValue("nombre", "");
    setValue("descripcion", "");
    setValue("ruta", "");
    setValue("num_modulo", 1);
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { data } = useFetchGetAllOnlyModulo();
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
          subMenu="Actualizacion de sub-modulo"
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
              name="num_modulo"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <InputLabel id="num_modulo">Modulo</InputLabel>
                  <Select
                    id="num_modulo"
                    label="Modulo"
                    size="medium"
                    onChange={onChange}
                    value={value != null ? value : ""}
                    error={errors.num_modulo ? true : false}
                    placeholder=" "
                    sx={{ color: "black" }}
                  >
                    {data?.rows.map((x) => (
                      <MenuItem
                        value={x.num_modulo}
                        key={x.num_modulo}
                        defaultValue={x.num_modulo}
                      >
                        {x.nombre_modulo}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.num_modulo ? (
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
                  id="sub_modulo"
                  label="sub_modulo"
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
                  placeholder=" Nombre de la sub_modulo"
                />
              )}
            />
            <Controller
              name="ruta"
              control={control}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="ruta"
                  label="Ruta"
                  size="medium"
                  //fullWidth
                  onChange={onChange}
                  value={value}
                  error={errors.ruta ? true : false}
                  helperText={
                    errors.nombre ? "Por favor completar el campo" : ""
                  }
                  type="search"
                  autoComplete="off"
                  placeholder="Escriba la ruta"
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
                  id="sub_moduloDescripcion"
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
                  placeholder="Descripcion del sub modulo"
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
