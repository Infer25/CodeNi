import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { TableCustom } from "@/shared/components/tableHead";
import { ModelAlert } from "@/shared/zustand/slice/proceso/gestion_colaborador";
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
  useTheme,
} from "@mui/material";
import { SyntheticEvent, forwardRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFetchGetAllOnlyTipoIdentificacion } from "../query";
import { column } from "./columnTableAgregarIdentificacion";
import { TableBodyFrmAgregarIdnetificacion } from "./tableBody";

type ModelFrmPersonaCbxOrigen = {
  title: string;
  num_tipo_identificacion: number;
};

type ModelAgregarIdentificacion = {
  num_tipo_identificacion: ModelFrmPersonaCbxOrigen;
  identificacion: string;
};

type ModelAgregarIdentificacionState = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FrmAgregarIdentificacion: React.FC<
  ModelAgregarIdentificacionState
> = ({ open, setOpen }) => {
  //const handleOpen = () => setOpen(true);

  const { list, setvalueFrm, limpiar } = useStoreGlobal(
    (state) => ({
      list: state.listTipoIdentificacionFrmAgregarPersona,
      setvalueFrm: state.setValueListFrmAgregarIdentificacion,
      limpiar: state.clearListFrmAgregarIdentificacion
    })
  );
  const theme = useTheme();

  const { data } = useFetchGetAllOnlyTipoIdentificacion();
  const {
    control,
    formState: { errors },
    getValues,
    reset,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm<ModelAgregarIdentificacion>();

  //const [cantidadElementos,setCantidadElementos] =useState<number>(0)
  const add = () => {
    //setIdTable(idTable + 1);

    if (
      getValues("identificacion") != "" &&
      getValues("num_tipo_identificacion").title != undefined
    ) {
      const valor = list.find(
        (x) =>
          x.nombre_identificacion == getValues("num_tipo_identificacion").title
      );

      const valor1 = list.find(
        (x) => x.identificacion == getValues("identificacion")
      );

      if (valor == undefined && valor1 == undefined) {
        // setCantidadElementos(list.length+1)

        setvalueFrm({
          id: '0',
          num_tipo_identificacion: getValues(
            "num_tipo_identificacion.num_tipo_identificacion"
          ),
          nombre_identificacion: getValues("num_tipo_identificacion.title"),
          identificacion: getValues("identificacion"),
        });
        reset();

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
      watch("num_tipo_identificacion.title") == undefined
        ? setError("num_tipo_identificacion.title", {
            message: "Seleccione una opcion",
          })
        : clearErrors("num_tipo_identificacion");

      watch("identificacion") == ""
        ? setError("identificacion", { message: "Complete el campo" })
        : clearErrors("identificacion");
    }
  };

  const limpiarCBX = () => {
    watch("num_tipo_identificacion.title") == ""
      ? setError("num_tipo_identificacion", {
          message: "Seleccione una opcion",
        })
      : clearErrors("num_tipo_identificacion");
  };

  const cleanIdentificador = () => {
    watch("identificacion") == ""
      ? setError("identificacion", { message: "Complete el campos" })
      : clearErrors("identificacion");
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

    reset();
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
    reset();
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
    setValue("num_tipo_identificacion.num_tipo_identificacion", id);
    getValues("num_tipo_identificacion").num_tipo_identificacion;
  };

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
                  control={control}
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
                    control={control}
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
