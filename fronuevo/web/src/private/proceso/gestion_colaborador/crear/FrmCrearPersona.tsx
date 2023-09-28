import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  useTheme
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Controller, useForm } from "react-hook-form";
import { useCreatePersona, useFetchGetAllOnlyMunicipio } from "../query";
import { rutaFrmCrearPersona } from "./ruta";

import { ModelFrmPersona } from "@/shared/zustand/slice/proceso/gestion_colaborador";
import { useStoreGlobal } from "@/shared/zustand/store";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { FrmAgregarIdentificacion } from "./FrmAgregarIdentificacion";
export const FrmCrearPersona: React.FC<{}> = () => {
  const { mutate: crear } = useCreatePersona();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ModelFrmPersona>();

  const { list } = useStoreGlobal((state) => ({
    list: state.listTipoIdentificacionFrmAgregarPersona,
  }));

  const onSubmit = (data: ModelFrmPersona) => {
    crear(data);
    reset();
  };
  const { data } = useFetchGetAllOnlyMunicipio();
  const theme = useTheme();

  const [valueDialog, setValueDialog] = useState(false);

  const click = () => {
    const newList = list;
    list.map((x) =>
      newList.map(
        (y,index) => (
          (y.id = (index + 1).toString()),
          (y.num_tipo_identificacion = x.num_tipo_identificacion),
          (y.nombre_identificacion = x.nombre_identificacion),
          (y.identificacion = x.identificacion)
        )
      )
    );
    setValue("identificacio", newList);
  };

  return (
    <>
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Registro de datos personales"
          url={rutaFrmCrearPersona}
        />
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  flexGrow: 1,
                }}
              >
                <TextField
                  id="identificacio"
                  label="Identificaiòn"
                  size="medium"
                  error={errors.identificacio ? true : false}
                  helperText={
                    errors.identificacio ? "Por favor completar el campo" : ""
                  }
                  //type="search"
                  autoComplete="off"
                  placeholder="Escriba el nombre"
                  fullWidth
                  value={list.length > 0 ? "Completo" : ""}
                  disabled
                />

                <Tooltip title="Añadir identificacion">
                  <IconButton
                    id="CrearIdentificacion"
                    sx={{
                      border: 1,
                      borderRadius: 50,
                      bgcolor: theme.palette.primary.light,
                      ":hover": {
                        bgcolor: theme.palette.primary.dark,
                      },
                    }}
                    size="medium"
                    color="primary"
                    onClick={() => setValueDialog(!valueDialog)}
                  >
                    <AddIcon sx={{ color: "white" }} fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Controller
                name="origen"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="origen"
                    label="Origen"
                    size="medium"
                    select
                    onChange={onChange}
                    value={value != null ? value : ""}
                    error={errors.origen ? true : false}
                    placeholder=" Nombre del departamento"
                    sx={{ color: "black", width: "100%" }}
                  >
                    {data?.rows
                      ? data?.rows?.map((x) => (
                          <MenuItem key={x.id} value={x.id}>
                            {x.nombre}
                          </MenuItem>
                        ))
                      : []}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Controller
                name="nombre"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="nombre"
                    label="Nombre"
                    size="medium"
                    onChange={onChange}
                    value={value}
                    error={errors.nombre ? true : false}
                    helperText={
                      errors.nombre ? "Por favor completar el campo" : ""
                    }
                    //type="search"
                    autoComplete="off"
                    placeholder="Escriba su nombre"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Controller
                name="apellido_razonsocial"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="apellido_razonsocial"
                    label="Apellido"
                    size="medium"
                    onChange={onChange}
                    value={value}
                    error={errors.apellido_razonsocial ? true : false}
                    helperText={
                      errors.apellido_razonsocial
                        ? "Por favor completar el campo"
                        : ""
                    }
                    //type="search"
                    autoComplete="off"
                    placeholder="Escriba su apellid/razon social"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Controller
                name="fechanac_fechaconstitucion"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DateField"]}
                      sx={{
                        marginTop: 0,
                      }}
                    >
                      <DateField
                        label="Fecha Nacimiento"
                        slotProps={{
                          textField: { size: "medium" },
                        }}
                        onChange={onChange}
                        value={value}
                        sx={{ flexGrow: 1 }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Controller
                name="movil"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="movil"
                    label="Movil"
                    size="medium"
                    onChange={onChange}
                    value={value}
                    error={errors.movil ? true : false}
                    helperText={
                      errors.movil ? "Por favor completar el campo" : ""
                    }
                    //type="search"
                    autoComplete="off"
                    placeholder="Escriba el nombre"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="email"
                    label="Correo electronico"
                    size="medium"
                    onChange={onChange}
                    value={value}
                    error={errors.email ? true : false}
                    helperText={
                      errors.email ? "Por favor completar el campo" : ""
                    }
                    //type="search"
                    autoComplete="off"
                    placeholder="Escriba el nombre"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Controller
                name="direccion"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="direccion"
                    label="Direccion"
                    size="medium"
                    onChange={onChange}
                    value={value}
                    error={errors.direccion ? true : false}
                    helperText={
                      errors.direccion ? "Por favor completar el campo" : ""
                    }
                    //type="search"
                    autoComplete="off"
                    placeholder="Escriba el nombre"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
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
                  onClick={click}
                >
                  Guardar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>

      <FrmAgregarIdentificacion open={valueDialog} setOpen={setValueDialog} />
    </>
  );
};
