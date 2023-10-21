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

import { ModelFrmrol_Tbl_rubro_coordenada_Crear } from "@/shared/zustand/slice/Rubro_Coordenada";
import { Controller, useFormContext } from "react-hook-form";
import {
  useCreateCoordenadaRubro,
  useFetchGetAllgetDepartamento,
  useFetchGetAllgetRubro,
} from "../query";

type props = {
  state: boolean;
  setStateCrear: React.Dispatch<React.SetStateAction<boolean>>;
};
export const FrmCrearRubroCoordenada: React.FC<props> = ({
  state,
  setStateCrear,
}) => {
  const theme = useTheme();

  //const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: Departamento } = useFetchGetAllgetDepartamento();
  const { data: Rubro } = useFetchGetAllgetRubro();
  const { mutate: Crear } = useCreateCoordenadaRubro()
  const metodo = useFormContext<ModelFrmrol_Tbl_rubro_coordenada_Crear>();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = metodo;

  const onSubmit = (data: ModelFrmrol_Tbl_rubro_coordenada_Crear) => {
    if (data.num_departamento != "" && data.num_rubro != ""&&  data.longitid != "" && data.latitud != "") Crear(data);
    console.log(data);
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
      // sx={{ zIndex: 10000 }}
    >
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Registro de RubroCoordenada"
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
                width: "100%",
                display: "flex",
                flexDirection:fullScreen? "column":'row',
                gap: 1,
              }}
            >
              <Controller
                name="num_departamento"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl sx={{width:'100%'}}>
                    <InputLabel id="num_departamento">Departamento</InputLabel>
                    <Select
                      id="num_departamento"
                      label="Departamento"
                      size="medium"
                      onChange={onChange}
                      value={value != null ? value : ""}
                      error={errors.num_rubro ? true : false}
                      placeholder=" "
                      sx={{ color: "black" }}
                    >
                      {Departamento?.map((x) => (
                        <MenuItem
                          value={x.num_departamento_region}
                          key={x.num_departamento_region}
                          defaultValue={x.num_departamento_region}
                        >
                          {x.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.num_rubro ? (
                      <FormHelperText sx={{ color: "red" }}>
                        Por favor seleccione una opciòn
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />

              <Controller
                name="num_rubro"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl sx={{width:'100%'}}>
                    <InputLabel id="num_rubro">Rubro</InputLabel>
                    <Select
                      id="num_rubro"
                      label="Rubro"
                      size="medium"
                      onChange={onChange}
                      value={value != null ? value : ""}
                      error={errors.num_rubro ? true : false}
                      placeholder=" "
                      sx={{ color: "black" }}
                    >
                      {Rubro?.map((x) => (
                        <MenuItem
                          value={x.num_rubro}
                          key={x.num_rubro}
                          defaultValue={x.num_rubro}
                        >
                          {x.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.num_rubro ? (
                      <FormHelperText sx={{ color: "red" }}>
                        Por favor seleccione una opciòn
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection:fullScreen? "column":'row',
                gap: 1,
              }}
            >
              <Controller
                name="latitud"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="latitud"
                    label="Latitud"
                    size="medium"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    error={errors.latitud ? true : false}
                    helperText={
                      errors.latitud ? "Por favor completar el campo" : ""
                    }
                    type="number"
                    autoComplete="off"
                    placeholder="Latitud"
                  />
                )}
              />
              <Controller
                name="longitid"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="longitid"
                    label="longitid"
                    size="medium"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    error={errors.longitid ? true : false}
                    helperText={
                      errors.longitid ? "Por favor completar el campo" : ""
                    }
                    type="number"
                    autoComplete="off"
                    placeholder="longitid"
                  />
                )}
              />
            </Box>

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
