import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Transition } from "@/shared/components/transition";
import { ModelFrmclasificacion_empresaFormulario } from "@/shared/zustand/slice/frmCatClasificacionEmpresa";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useCreateclasificacion_empresa } from "../query";

type props = {
  state: boolean;
  setStateCrear: React.Dispatch<React.SetStateAction<boolean>>;
};
export const FrmCrearclasificacion_empresa: React.FC<props> = ({
  state,
  setStateCrear,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const { mutate: crear } = useCreateclasificacion_empresa();
  const metodo = useFormContext<ModelFrmclasificacion_empresaFormulario>();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = metodo;

  const onSubmit = (data: ModelFrmclasificacion_empresaFormulario) => {
    if (data.nombre != "" && data.descripcion != "") crear(data);
    reset();
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={state}
      maxWidth={"md"}
      TransitionComponent={Transition}
      fullWidth
      fullScreen={fullScreen}
      sx={{ zIndex: 10000 }}
    >
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Registro de clasificacion empresa"
        
          children={
            <IconButton
              onClick={() => setStateCrear(false)}
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
              height: "100%",
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
                  id="clasificacion_empresa"
                  label="Clasificaciò de empresa"
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
                  placeholder="Escriba el nombre del clasificacion_empresa"
                />
              )}
            />

            <Controller
              name="descripcion"
              control={control}
              rules={{ required: true }}
              defaultValue=""
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
                  autoComplete="off"
                  placeholder="Escriba la descripcion del clasificacion_empresa"
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
    </Dialog>
  );
};
