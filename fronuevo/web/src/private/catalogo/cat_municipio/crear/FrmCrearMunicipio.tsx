import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { ModelFrmMunicipioFormulario } from "@/shared/zustand/slice/frmMunicipio";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useCreateMunicipio, useFetchGetAllOnlyDepartamento } from "../query";
import { rutaFrmCrearMunicipio } from "./ruta";
export const FrmCrearMunicipio: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const { mutate: crear } = useCreateMunicipio();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ModelFrmMunicipioFormulario>();

  const onSubmit = (data: ModelFrmMunicipioFormulario) => {
    if (data.nombre != "" && data.descripcion != "") crear(data);
    reset();
  };

  const { data } = useFetchGetAllOnlyDepartamento();

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Registro Municipio"
        url={rutaFrmCrearMunicipio}
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
                id="Municipio"
                label="Municipio"
                size="medium"
                //fullWidth
                onChange={onChange}
                value={value}
                error={errors.nombre ? true : false}
                helperText={errors.nombre ? "Por favor completar el campo" : ""}
                type="search"
                autoComplete="off"
                placeholder=" Nombre del departamento"
              />
            )}
          />
          <Controller
            name="num_departamento"
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
                  error={errors.num_departamento ? true : false}
                  placeholder=" "
                  sx={{ color: "black" }}
                >
                  {data?.rows.map((x) => (
                    <MenuItem value={x.id} key={x.id} defaultValue={x.id}>
                      {x.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.num_departamento ? (
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
                placeholder="Descripcion de región"
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
