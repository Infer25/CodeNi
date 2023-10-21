import { PrivateRoutes } from "@/routes/routes";
import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { CerrarBtn } from "@/shared/components/cerrar";
import { ModelFrmActualizarRubro } from "@/shared/zustand/slice/frmRubro";
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
import { useFetchGetAllOnlyTipoRubro, useUpdateRubro } from "../../query";

export const FrmActualizarRubro: React.FC<{}> = () => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ModelFrmActualizarRubro>();

  const { id, nombre, descripcion, num_fk, nombre_fk } = useStoreGlobal(
    (state) => ({
      id: state.idFrmRubroActualizar,
      num_fk: state.idFrmRubroActualizarRegion,
      nombre_fk: state.nombreFrmRubroActualizarRegion,
      nombre: state.nombreFrmRubroActualizar,
      descripcion: state.descripcionFrmRubroActualizar,
    })
  );

  const { mutate: actualizar } = useUpdateRubro();

  useEffect(() => {
    setValue("id", +id);
    setValue("num_tipo_rubro", num_fk);
    setValue("TipotRubro", nombre_fk);
    setValue("nombre", nombre);
    setValue("descripcion", descripcion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: ModelFrmActualizarRubro) => {
    if (data.nombre != "" && data.descripcion != "" && data.id != 0) {
      actualizar(data);
      reset();
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATRUBRO}`);
    } else {
      alert("no valido");
    }
  };
  const limpiar = () => {
    setValue("nombre", "");
    setValue("descripcion", "");
    setValue("num_tipo_rubro", "");
  };

  const { data } = useFetchGetAllOnlyTipoRubro();

  return (
    <FormContainer>
      <ToolBarTitle
        modulo="Gestion del sistma"
        subMenu="Actualizacion de rubro"
        children={
          <CerrarBtn
            ruta={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SISTEMA}/${PrivateRoutes.CATRUBRO}`}
          />
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
            name="num_tipo_rubro"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <InputLabel id="num_tipo_rubro">Tipo de rubro</InputLabel>
                <Select
                  id="num_tipo_rubro"
                  label="Tipo de rubro"
                  size="medium"
                  onChange={onChange}
                  value={data?.rows ? value : ""}
                  error={errors.num_tipo_rubro ? true : false}
                  // placeholder=" Nombre del departamento"
                  sx={{ color: "black" }}
                >
                  {data?.rows.map((x) => (
                    <MenuItem value={x.id} key={x.id}>
                      {x.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.num_tipo_rubro ? (
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
