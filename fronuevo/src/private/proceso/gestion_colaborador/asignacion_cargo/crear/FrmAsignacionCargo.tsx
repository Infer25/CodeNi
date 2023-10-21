import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Transition } from "@/shared/components/transition";
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

import { ModelFrmHistorialCargoFormulario } from "@/shared/zustand/slice/proceso/gestion_colaborador/frmAsignacionCargo";
import { Controller, useFormContext } from "react-hook-form";
import {
  useCreateAsignacionCargo,
  useFetchGetAllOnlyArea,
  useFetchGetAllOnlyCargoFiltroArea,
} from "../query";
import { rutaFrmCrearcargo } from "./ruta";

type props = {
  state: boolean;
  setStateCrear: React.Dispatch<React.SetStateAction<boolean>>;
};
export const FrmAsignacionCargo: React.FC<props> = ({
  state,
  setStateCrear,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const { mutate: crear } = useCreateAsignacionCargo();
  const { data } = useFetchGetAllOnlyArea();

  const metodo = useFormContext<ModelFrmHistorialCargoFormulario>();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = metodo;
  const { data: cargo } = useFetchGetAllOnlyCargoFiltroArea(
    watch("num_area") != null || undefined || "" ? +watch("num_area") : 1
  );
  const onSubmit = (data: ModelFrmHistorialCargoFormulario) => {

    if (data.num_colaborador != "" && data.num_cargo != "") crear(data);
    reset();
    setStateCrear(false)
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
          subMenu="Asignacion de cargo"
          url={rutaFrmCrearcargo}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: fullScreen?'column': "row" ,
                width: "100%",
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
                    id="cargo"
                    label="Nombre del colaborador"
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
                    placeholder="Seleccione el colaborador"
                    disabled
                    sx={{ flexGrow: 1 }}
                  />
                )}
              />
              <Controller
                name="cedula"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="cedula"
                    label="Identificador del colaborador"
                    size="medium"
                    //fullWidth
                    onChange={onChange}
                    value={value}
                    error={errors.cedula ? true : false}
                    helperText={
                      errors.cedula ? "Por favor completar el campo" : ""
                    }
                    type="search"
                    autoComplete="off"
                    disabled
                    sx={{ flexGrow: 1 }}
                  />
                )}
              />
            </Box>
            <Controller
              name="num_area"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <InputLabel id="num_area">Area</InputLabel>
                  <Select
                    id="num_area"
                    label="Area"
                    size="medium"
                    onChange={onChange}
                    value={value != null || undefined || "" ? value : ""}
                    error={errors.num_area ? true : false}
                    placeholder=" "
                    sx={{ color: "black" }}
                    onClick={() => setValue("num_cargo", "")}
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
              name="num_cargo"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <InputLabel id="num_cargo">Cargo</InputLabel>
                  <Select
                    id="num_cargo"
                    label="Cargo"
                    size="medium"
                    onChange={onChange}
                    value={value != null ? value : ""}
                    error={errors.num_cargo ? true : false}
                    sx={{ color: "black" }}
                    disabled={!watch("num_area")}
                  >
                    {cargo?.rows.map((x) => (
                      <MenuItem value={x.num_cargo} key={x.num_cargo}>
                        {x.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.num_cargo ? (
                    <FormHelperText sx={{ color: "red" }}>
                      Por favor seleccione una opciòn
                    </FormHelperText>
                  ) : null}
                </FormControl>
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
                  onChange={onChange}
                  value={value}
                  error={errors.descripcion ? true : false}
                  helperText={
                    errors.descripcion ? "Por favor completar el campo" : ""
                  }
                  autoComplete="off"
                  placeholder="Escriba la descripcion del cargo"
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
