import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { TableCustom } from "@/shared/components/tableHead";
import {
  ModelAlert,
  ModelFrmPersona,
} from "@/shared/zustand/slice/proceso/gestion_colaborador";
import { useStoreGlobal } from "@/shared/zustand/store";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  AlertProps,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { SyntheticEvent, forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useFetchGetAllOnlyTipoIdentificacion } from "../query";
import { column } from "./columnTableAgregarIdentificacion";
import { TableBodyFrmAgregarIdnetificacion } from "./tableBody";
import { Transition } from "@/shared/components/transition";

type ModelAgregarIdentificacionState = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FrmAgregarIdentificacion: React.FC<
  ModelAgregarIdentificacionState
> = ({ open, setOpen }) => {
 

  const { list, setvalueFrm, limpiar } = useStoreGlobal((state) => ({
    list: state.listTipoIdentificacionFrmAgregarPersona,
    setvalueFrm: state.setValueListFrmAgregarIdentificacion,
    limpiar: state.clearListFrmAgregarIdentificacion,
  }));
  const theme = useTheme();

  const { data } = useFetchGetAllOnlyTipoIdentificacion();

  const metodo = useFormContext<ModelFrmPersona>();

  const {
    formState: { errors },
  } = metodo;
  //const [cantidadElementos,setCantidadElementos] =useState<number>(0)
  const add = () => {
    //setIdTable(idTable + 1);

    if (
      metodo.getValues("identificacion") != "" &&
      metodo.getValues("num_tipo_identificacion.title") != undefined
    ) {
      const valor = list.find(
        (x) =>
          x.nombre_identificacion ==
          metodo.getValues("num_tipo_identificacion.title")
      );

      const valor1 = list.find(
        (x) => x.identificacion == metodo.getValues("identificacion")
      );

      if (valor == undefined && valor1 == undefined) {
        // setCantidadElementos(list.length+1)

        setvalueFrm({
          id: "0",
          num_tipo_identificacion: metodo.getValues(
            "num_tipo_identificacion.num_tipo_identificacion"
          ),
          nombre_identificacion: metodo.getValues(
            "num_tipo_identificacion.title"
          ),
          identificacion: metodo.getValues("identificacion")!,
        });
        metodo.reset();

        setOpenAlertopenAlertError({ state: "success", title: "Agregado" });
        setOpenAlert(true);
      } else {
        setOpenAlertopenAlertError({
          state: "error",
          title:
            "Solo puedes agregar uno de cada tipo y los identificadores deben ser unicos",
        });
        setOpenAlert(true);
      }
    } else {
      metodo.watch("num_tipo_identificacion.title") == undefined
        ? metodo.setError("num_tipo_identificacion.title", {
            message: "Seleccione una opcion",
          })
        : metodo.clearErrors("num_tipo_identificacion");

      metodo.watch("identificacion") == ""
        ? metodo.setError("identificacion", { message: "Complete el campo" })
        : metodo.clearErrors("identificacion");
    }
  };

  const limpiarCBX = () => {
    metodo.watch("num_tipo_identificacion.title") == ""
      ? metodo.setError("num_tipo_identificacion", {
          message: "Seleccione una opcion",
        })
      : metodo.clearErrors("num_tipo_identificacion");
  };

  const cleanIdentificador = () => {
    metodo.watch("identificacion") == ""
      ? metodo.setError("identificacion", { message: "Complete el campos" })
      : metodo.clearErrors("identificacion");
  };

  //notificacion
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const [openAlertError, setOpenAlertopenAlertError] = useState<ModelAlert>(); //contenido

  const handlerCloseAlert = (_?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const SnackBarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackBarAlert(props, ref) {
      return <Alert elevation={6} ref={ref} {...props} />;
    }
  );

  const handleClose = () => {
    metodo.reset();
    const valor = list.map((x) => x.nombre_identificacion);

    if (valor.length > 0) {
      setOpenAlertopenAlertError({ state: "success", title: "Agregado" });
      setOpenAlert(true);
      setOpen(false);
    } else {
      setOpenAlertopenAlertError({
        state: "error",
        title: "Debe agregar al menos la cedula",
      });
      setOpenAlert(true);
    }
  };

  const cleanTable = () => {
    metodo.reset();
    const valor = list.map((x) => x.identificacion);
    if (valor.length > 0) {
      limpiar();
      setOpenAlertopenAlertError({
        state: "success",
        title: "Elementos eliminados",
      });
      setOpenAlert(true);
    } else {
      setOpenAlertopenAlertError({
        state: "warning",
        title: "No hay elementos en la tabla",
      });
      setOpenAlert(true);
    }
  };

  const setID = (id: number) => {
    metodo.setValue("num_tipo_identificacion.num_tipo_identificacion"!, id);
    metodo.getValues("num_tipo_identificacion.num_tipo_identificacion");
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  /// id incrementable
  //const [idTable, setIdTable] = useState<number>(1);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth
        maxWidth={"sm"}
        TransitionComponent={Transition}
        fullScreen={fullScreen}
      >
        <FormContainer>
          <ToolBarTitle
            modulo="Gestion de colaborador"
            subMenu="Registro de datos personales"
            url={[]}
            close={
              <IconButton size="large" onClick={() => setOpen(false)}>
                <CloseIcon fontSize="large" />
              </IconButton>
            }
          />
          <Box component={"form"}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="num_tipo_identificacion.title"
                  control={metodo.control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="tipo"
                      select
                      label="Tipo de identificacion"
                      size="medium"
                      onChange={onChange}
                      value={value ? value : ""}
                      error={
                        errors.num_tipo_identificacion?.title ? true : false
                      }
                      placeholder=" Nombre del departamento"
                      sx={{ color: "black", width: "100%" }}
                      onClick={limpiarCBX}
                      helperText={
                        errors.num_tipo_identificacion?.title
                          ? errors.num_tipo_identificacion.title.message
                          : ""
                      }
                    >
                      {data?.rows
                        ? data?.rows?.map((x) => (
                            <MenuItem
                              key={x.id}
                              value={x.nombre}
                              onClick={() => setID(+x.id)}
                            >
                              {x.nombre}
                            </MenuItem>
                          ))
                        : []}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
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
                    name="identificacion"
                    control={metodo.control}
                    rules={{ required: true }}
                    defaultValue={""}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="identificacion"
                        label="Identificaiòn"
                        size="medium"
                        onChange={onChange}
                        value={value}
                        error={errors.identificacion ? true : false}
                        onKeyUp={cleanIdentificador}
                        helperText={
                          errors.identificacion
                            ? errors.identificacion.message
                            : ""
                        }
                        type="search"
                        autoComplete="off"
                        placeholder="Numero de identificacion"
                        margin="dense"
                        fullWidth
                      />
                    )}
                  />

                  <TextField
                    {...metodo.register("identificacio")}
                    value={JSON.stringify(list)}
                    sx={{ display: "none" }}
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
                      onClick={add}
                    >
                      <AddIcon sx={{ color: "white" }} fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TableCustom
                  list={column}
                  children={
                    <TableBodyFrmAgregarIdnetificacion
                      list={list ? list : []}
                      setOpenAlertopenAlertError={setOpenAlertopenAlertError}
                      setOpenAlert={setOpenAlert}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    flexGrow: 1,
                    mb: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<ClearIcon />}
                    sx={{ bgcolor: "red" }}
                    onClick={cleanTable}
                  >
                    Cancelar
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    onClick={handleClose}
                  >
                    Agregar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handlerCloseAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <SnackBarAlert
          onClose={handlerCloseAlert}
          severity={openAlertError?.state}
        >
          {openAlertError?.title}
        </SnackBarAlert>
      </Snackbar>
    </>
  );
};
