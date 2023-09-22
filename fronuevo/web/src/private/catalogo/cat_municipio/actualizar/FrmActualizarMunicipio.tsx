import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { ModelFrmActualizarMunicipio } from "@/shared/zustand/slice/frmMunicipio";
import { useStoreGlobal } from "@/shared/zustand/store";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
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
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { rutaFrmActualizarMunicipio } from ".";
import { useFetchGetAllOnlyDepartamento, useUpdateMunicipio } from "../query";

export const FrmActualizarMunicipio: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    
  } = useForm<ModelFrmActualizarMunicipio>();

  const { id, nombre, descripcion ,num_departamento,Region} = useStoreGlobal((state) => ({
    id: state.idFrmMunicipioActualizar,
    num_departamento:state.idFrmMunicipioActualizarRegion,
    Region:state.nombreFrmMunicipioActualizarRegion,
    nombre: state.nombreFrmMunicipioActualizar,
    descripcion: state.descripcionFrmMunicipioActualizar,

  }));


  const { mutate: actualizar } = useUpdateMunicipio();

  useEffect(() => {
    setValue("id", +id);
    setValue("num_departamento", num_departamento);
    setValue("Departamento",Region);
    setValue("nombre", nombre);
    setValue("descripcion", descripcion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: ModelFrmActualizarMunicipio) => {
    if (data.nombre != "" && data.descripcion != "" && data.id != 0) {
      actualizar(data);
      reset();
      navigate("/sistema/viewCatalogo/municipio");
    } else {
      alert("no valido");
    }
  };
  const limpiar = () => {
    setValue("nombre", "");
    setValue("descripcion", "");
    setValue("num_departamento", '');
  };

  const { data } = useFetchGetAllOnlyDepartamento();
 
  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Actualizar municipio"
        url={rutaFrmActualizarMunicipio}
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
                <InputLabel id="num_region">Departamento</InputLabel>
                <Select
                  id="num_departamento"
                  label="Departamento"
                  size="medium"
                  onChange={onChange}
                  
                  value={data?.rows?value:''}

                  error={errors.num_departamento ? true : false}
                 // placeholder=" Nombre del departamento"
                  sx={{ color: "black" }}
                  
                >
                  {data?.rows.map((x) => (
                    <MenuItem value={x.id} key={x.id} >
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
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </FormContainer>
  );
};
