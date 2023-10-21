/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { ModelFrmPersona } from "@/shared/zustand/slice/proceso/gestion_colaborador";
import { useStoreGlobal } from "@/shared/zustand/store";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LastPageIcon from "@mui/icons-material/LastPage";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import UndoIcon from "@mui/icons-material/Undo";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  useCreatePersona,
  useFetchGetAllOnlyEstadoCivil,
  useFetchGetAllOnlyMunicipio,
  useFetchGetAllOnlyTipoColaborador,
} from "../query";
import { FrmAgregarIdentificacion } from "./FrmAgregarIdentificacion";
import { rutaFrmCrearPersona } from "./ruta";

export const FrmCrearPersona: React.FC<{}> = () => {
  const { mutate: crear } = useCreatePersona();
  const methods = useForm<ModelFrmPersona>();
  const {
    formState: { errors },
  } = methods;

  const { limpiar, listIdentificacion } = useStoreGlobal((state) => ({
    limpiar: state.clearListFrmAgregarIdentificacion,
    listIdentificacion: state.listTipoIdentificacionFrmAgregarPersona,
  }));

  const onSubmit = (data: ModelFrmPersona) => {
    try {
      const formData = new FormData();

      const files = methods.getValues("imagen");

      for (let i = 0; i < files.length; i++) {
        formData.append("imagen", files[i]);
      }

      Object.keys(data).forEach((key) => {
        const value = data[key as keyof ModelFrmPersona];
        if (key != "imagen") formData.append(key, String(value));
      });
      crear(formData);
      methods.reset();
      limpiar();
    } catch (e) {
      console.log(e);
    }
  };
  const { data } = useFetchGetAllOnlyMunicipio();
  const { data: EstadoCivil } = useFetchGetAllOnlyEstadoCivil();
  const { data: TipoColaborador } = useFetchGetAllOnlyTipoColaborador();

  const theme = useTheme();

  const [valueDialog, setValueDialog] = useState(false);

  //////form
  const [step, setStep] = useState<number>(1);

  const next = () => {
    setStep(2);
  };

  const back = () => {
    setStep(1);
  };

  const celular = useMediaQuery<boolean>(theme.breakpoints.down("md"));
  const genero = [
    { title: "Femenino", value: "F" },
    { title: "Masculino", value: "M" },
  ];

  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = () => {
    const file = methods.getValues("imagen")[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormContainer>
        {step == 1 ? (
          <React.Fragment>
            <ToolBarTitle
              modulo="Gestion del sistma"
              subMenu="Registro de datos personales"
              url={rutaFrmCrearPersona}
            />
            <Box
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
                    <Controller
                      name="identificacio"
                      control={methods.control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="Indenti"
                          label={
                            listIdentificacion.length > 0
                              ? "Informacion completa"
                              : "Identificacion"
                          }
                          size="medium"
                          onChange={onChange}
                          value={value}
                          error={errors.identificacio ? true : false}
                          helperText={
                            errors.identificacio
                              ? "Por favor agregar al menos la cedula"
                              : ""
                          }
                          fullWidth
                          disabled
                        />
                      )}
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
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="Origen"
                        aria-label={"Origen"}
                        label="Origen"
                        size="medium"
                        select
                        onChange={onChange}
                        value={value != null ? value : ""}
                        error={errors.origen ? true : false}
                        placeholder=" Nombre del departamento"
                        sx={{ color: "black", width: "100%" }}
                        disabled={listIdentificacion.length > 0 ? false : true}
                        helperText={
                          errors.origen ? "Por favor seleccione una opcion" : ""
                        }
                        //typ
                      >
                        {data?.rows
                          ? data?.rows?.map((x) => (
                              <MenuItem key={x.id} value={x.id} id="Origen">
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
                    control={methods.control}
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
                        disabled={listIdentificacion.length > 0 ? false : true}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="apellido_razonsocial"
                    control={methods.control}
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
                        disabled={listIdentificacion.length > 0 ? false : true}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="fechanac_fechaconstitucion"
                    control={methods.control}
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
                            disabled={
                              listIdentificacion.length > 0 ? false : true
                            }
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="movil"
                    control={methods.control}
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
                        disabled={listIdentificacion.length > 0 ? false : true}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="email"
                    control={methods.control}
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
                        disabled={listIdentificacion.length > 0 ? false : true}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="direccion"
                    control={methods.control}
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
                        disabled={listIdentificacion.length > 0 ? false : true}
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
                      onClick={() => methods.reset()}
                      sx={{ bgcolor: "red" }}
                    >
                      Limpiar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<LastPageIcon />}
                      type="submit"
                      onClick={next}
                    >
                      Siguiente
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <FrmAgregarIdentificacion
              open={valueDialog}
              setOpen={setValueDialog}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ToolBarTitle
              modulo="Gestion del sistma"
              subMenu="Registro de datos del colaborador"
              url={rutaFrmCrearPersona}
              children={
                <Tooltip title={"Regresar"}>
                  <IconButton
                    onClick={back}
                    sx={{
                      bgcolor: theme.palette.primary.main,

                      ":hover": {
                        bgcolor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <UndoIcon
                      color="primary"
                      sx={{ color: theme.palette.common.white }}
                    />
                  </IconButton>
                </Tooltip>
              }
            />
            <Box
              component={"form"}
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{
                flexGrow: 1,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="imagen"
                    control={methods.control}
                    render={({ field: { onChange } }) => (
                      <div>
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          hidden
                          onChange={(e) => {
                            onChange(e.target.files);
                            handleImageChange();
                          }}
                        />
                        <label htmlFor="contained-button-file">
                          <Box sx={{ display: "grid", placeItems: "center" }}>
                            <Avatar
                              sx={{ height: "80px", width: "80px" }}
                              src={image!}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              size="small"
                              sx={{ marginTop: 1 }}
                            >
                              Subir Archivo
                            </Button>
                          </Box>
                        </label>
                      </div>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="tipo_colaborador"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        aria-label="tipo_colaborador"
                        id="tipo_colaborador"
                        select
                        label="Tipo de colaborador"
                        size="medium"
                        onChange={onChange}
                        value={value ? value : ""}
                        error={errors.tipo_colaborador ? true : false}
                        placeholder=" Nombre del departamento"
                        margin="dense"
                        sx={{ color: "black", width: "100%" }}
                        // onClick={limpiarCBX}
                        helperText={
                          errors.tipo_colaborador ? "Seleccione una opcion" : ""
                        }
                      >
                        {TipoColaborador?.rows.map((x) => (
                          <MenuItem
                            key={x.id}
                            value={x.id}
                            //onClick={() => setID(+x.id)}
                          >
                            {x.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="genero"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="genero"
                        select
                        label="Genero"
                        size="medium"
                        onChange={onChange}
                        value={value ? value : ""}
                        error={errors.genero ? true : false}
                        placeholder=" Nombre del departamento"
                        margin="dense"
                        sx={{ color: "black", width: "100%" }}
                        // onClick={limpiarCBX}
                        helperText={
                          errors.genero ? "Seleccione una opcion" : ""
                        }
                      >
                        {genero.map((x) => (
                          <MenuItem
                            key={x.value}
                            value={x.value}
                            //onClick={() => setID(+x.id)}
                          >
                            {x.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="estado_civil"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="estado_civil"
                        select
                        label="Estado civil"
                        size="medium"
                        onChange={onChange}
                        value={value ? value : ""}
                        error={errors.genero ? true : false}
                        placeholder=" Estado civil"
                        sx={{ color: "black", width: "100%" }}
                        // onClick={limpiarCBX}
                        helperText={
                          errors.genero ? "Seleccione una opcion" : ""
                        }
                        margin="dense"
                      >
                        {EstadoCivil?.rows.map((x) => (
                          <MenuItem
                            key={x.id}
                            value={x.id}
                            //onClick={() => setID(+x.id)}
                          >
                            {x.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="email_institucional"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="email_institucional"
                        label="Email institucional"
                        size="medium"
                        onChange={onChange}
                        value={value}
                        error={errors.nombre ? true : false}
                        helperText={
                          errors.nombre ? "Por favor completar el campo" : ""
                        }
                        type="search"
                        autoComplete="off"
                        placeholder="Escriba su email institucional"
                        margin="dense"
                        fullWidth
                        //disabled={listIdentificacion.length > 0 ? false : true}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="telefono_institucional"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="telefono_institucional"
                        label="Celular institucional"
                        size="medium"
                        onChange={onChange}
                        value={value}
                        error={errors.nombre ? true : false}
                        helperText={
                          errors.nombre ? "Por favor completar el campo" : ""
                        }
                        //type="search"
                        autoComplete="off"
                        placeholder="Escriba su celuar institucional"
                        margin="dense"
                        fullWidth
                        //disabled={listIdentificacion.length > 0 ? false : true}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: celular ? "space-between" : "flex-end",
                      gap: 1,
                      alignItems: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => methods.reset()}
                      sx={{ bgcolor: "red" }}
                    >
                      Limpiar
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveAsIcon />}
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </React.Fragment>
        )}
      </FormContainer>
    </FormProvider>
  );
};

/*

   <Stepper
          activeStep={step}
          orientation="horizontal"
          sx={{ width: celular ? "100%" : "60%", alignSelf: "center" }}
        >
          <Step>
            <StepLabel>Informacion personal</StepLabel>
          </Step>
          <Step>
            <StepLabel>Informacion del colaborador</StepLabel>
          </Step>
        </Stepper> */
