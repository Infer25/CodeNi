import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";


import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { rutaFrmCrearSituacionClimatica } from "./ruta";
import { useCreateSituacionClimatica } from "../query";
import { ModelFrmSituacionClimaticaFormulario } from "@/shared/zustand/slice/frmSituacionClimatica";


export const FrmCrearSituacionClimatica: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const { mutate: crear } = useCreateSituacionClimatica();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ModelFrmSituacionClimaticaFormulario>();

  const onSubmit = (data: ModelFrmSituacionClimaticaFormulario) => {
    if (data.nombre != "" && data.descripcion != "") crear(data);
    reset();
  };

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Registro de situacion climatica"
        url={rutaFrmCrearSituacionClimatica}
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
                id="SituacionClimatica"
                label="Situacion climatica"
                size="medium"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.nombre ? true : false}
                helperText={errors.nombre ? "Por favor completar el campo" : ""}
                type="search"
                autoComplete="off"
                placeholder="Escriba el nombre de la situacion climatica"
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
                id="descripcion"
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
                placeholder="Escriba la descripcion de la situacion climatica"
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
              startIcon={<DeleteIcon />}
              onClick={() => reset()}
              sx={{ bgcolor: "red" }}
            >
              Limpiar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
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
