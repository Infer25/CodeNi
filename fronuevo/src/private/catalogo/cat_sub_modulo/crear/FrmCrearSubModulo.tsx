import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Transition } from "@/shared/components/transition";
import { ModelFrmsub_moduloFormulario } from "@/shared/zustand/slice/frmCatSubModulo";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
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
import { Controller, useFormContext } from "react-hook-form";
import { useCreatesub_modulo, useFetchGetAllOnlyModulo } from "../query";

type props = {
  state: boolean;
  setStateCrear: React.Dispatch<React.SetStateAction<boolean>>;
};
export const FrmCrearsub_modulo: React.FC<props> = ({
  state,
  setStateCrear,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const { mutate: crear } = useCreatesub_modulo();
  const metodo = useFormContext<ModelFrmsub_moduloFormulario>();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = metodo;

  const onSubmit = (data: ModelFrmsub_moduloFormulario) => {
    if (data.nombre != "" && data.descripcion != "") crear(data);
    reset();
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
          subMenu="Registro de sub-modulo"
          
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
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="sub_modulo"
                  label="Sub modulo"
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
                  placeholder="Escriba el nombre del sub_modulo"
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
                  placeholder="Escriba la descripcion del sub_modulo"
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
