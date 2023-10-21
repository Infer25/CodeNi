import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { ModelFrmDptoRegionFormulario } from "@/shared/zustand/slice/frmDptoRegion";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useCreateDptoRegion, useFetchGetAllOnlyRegion } from "../query";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { PrivateRoutes } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
export const FrmCrearDptoRegion: React.FC<{}> = () => {
  const { mutate: crear } = useCreateDptoRegion();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ModelFrmDptoRegionFormulario>();

  const onSubmit = (data: ModelFrmDptoRegionFormulario) => {
    if (data.nombre != "" && data.descripcion != "" && data.num_region != "")
      crear(data);
    reset();
  };
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const { data } = useFetchGetAllOnlyRegion();
  const navigate = useNavigate();

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Registro departamento region"
        children={
          <Tooltip title={"Cerrar"}>
            <IconButton
              onClick={() =>
                navigate(
                  `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATDEPARTAMENTOPAIS}`,
                  { replace: true }
                )
              }
              size="large"
              sx={{
                border: 1,
                bgcolor: "red",
                color: "white",
                ":hover": {
                  bgcolor: "red",
                },
              }}
            />
          </Tooltip>
        }
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
                id="dptoPaisNombre"
                label="Departamento"
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
            name="num_region"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl >
                <InputLabel id="num_region">Region</InputLabel>
                <Select
                  id="num_region"
                  label="Region"
                  size="medium"
                  onChange={onChange}
                  value={value != null ? value : ""}
                  error={errors.num_region ? true : false}
                  placeholder=" Nombre del departamento"
                  sx={{ color: "black" }}
                >
                  {data?.rows.map((x) => (
                    <MenuItem value={x.id} key={x.id} defaultValue={x.id}>
                      {x.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.num_region ? (
                  <FormHelperText sx={{ color: "red" }}>
                    Por favor seleccione una opciòn
                  </FormHelperText>
                ) : (
                  null
                )}
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
                id="dptodescripcion"
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
/*

 <Controller
            name="descripcion"
            control={control}
            rules={{ required: true }}
            //defaultValue={[data?.rows?data.rows[0].nombre!:[]]}
            render={({ field: { ref,onChange } }) => (
              <Autocomplete
                disablePortal
                onChange={(_,data)=>onChange(data)}
              //  getOptionLabel={()=>data?.rows}
              //  defaultValue={value}
              //value={value}
                id="combo-box-Region"
                options={data?data.rows:[]}
                //sx={{ width: 300 }}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Region" inputRef={ref}  />
                )}
              />
            )}
          />
*/
