import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { TableCustom } from "@/shared/components/tableHead";
import { Transition } from "@/shared/components/transition";
import { CrearProveedor } from "@/shared/zustand/slice/proceso/frm_proveedor";
import DeleteIcon from "@mui/icons-material/Delete";
import LastPageIcon from "@mui/icons-material/LastPage";
import UndoIcon from "@mui/icons-material/Undo";
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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  useCreateProveedor,
  useFetchGetAllCategoriaProveedor,
  useFetchGetAllClasificacionEmpresa,
  useFetchGetAllFormaPago,
  useFetchGetAllTipoEmpresa,
} from "../query";
import { column } from "./column";
import { columnFormaPago } from "./columnFormaPago";
import { TableBodyFrmListModel_Categoria } from "./tableBodyCategoria";
import { TableBodyFrmListModel_FormaPago } from "./tableBodyFormaPago";

type props = {
  state: boolean;
  setStateCrear: React.Dispatch<React.SetStateAction<boolean>>;
};

interface modelTable {
  isTrue: boolean;
  num_categoria_proveedor: number;
  nombre_categoria_proveedor: string;
}

export interface modelTableListCategoria {
  lista: React.Dispatch<React.SetStateAction<modelTable[]>>;
  list: modelTable[];
}

interface modelTableFormaPago {
  isTrue: boolean;
  num_forma_pago: number;
  nombre_forma_pago: string;
}

export interface modelTableListFormaPago {
  Setlista: React.Dispatch<React.SetStateAction<modelTableFormaPago[]>>;
  listFormaPago: modelTableFormaPago[];
}

export const FrmCreaProveedor: React.FC<props> = ({ state, setStateCrear }) => {
  const theme = useTheme();
  //const celular = useMediaQuery(theme.breakpoints.down("sm"));
  // const { mutate: crear } = useCreaterol();
  const metodo = useFormContext<CrearProveedor>();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,

  } = metodo;

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { data } = useFetchGetAllTipoEmpresa();
  const { data: Clasificacion } = useFetchGetAllClasificacionEmpresa();
  const { mutate: crear } = useCreateProveedor();
  const [step, setStep] = useState<number>(1);

  const next = () => {
    if (
      getValues("num_tipo_empresa") == undefined ||
      getValues("num_clasificacion_empresa") == undefined ||
      getValues("cantidad_dias_espera") == ""
    ) {
      alert("Comlplete el formulario");
    } else {
      setStep(2);
    }
  };

  const back = () => {
    setStep(1);
  };
  //////////
  const { data: CategoriaProveedor } = useFetchGetAllCategoriaProveedor();

  const newList = CategoriaProveedor?.map((obj) => {
    return { ...obj, isTrue: true };
  });

  const [listCategoria, setListCategoria] = useState<modelTable[]>(
    newList ? newList : []
  );

  const { data: FormaPago } = useFetchGetAllFormaPago();

  const newListFormaPago = FormaPago?.map((obj) => {
    return { ...obj, isTrue: true };
  });

  const [listFormaPago, setListFormaPago] = useState<modelTableFormaPago[]>(
    newListFormaPago ? newListFormaPago : []
  );

  const onSubmit = (data: CrearProveedor) => {
    const numCategoria = listCategoria
      .filter((obj) => obj.isTrue)
      .map((obj, i) => {
        return {
          id: i + 1,
          num_categoria_proveedor: obj.num_categoria_proveedor,
        };
      });

    const numFomaPago = listFormaPago
      .filter((obj) => obj.isTrue)
      .map((obj, i) => {
        return { id: i + 1, num_forma_pago: obj.num_forma_pago };
      });

    crear(
      {
        num_persona: data.num_persona,
        num_tipo_empresa: data.num_tipo_empresa,
        cantidad_dias_espera: data.cantidad_dias_espera,
        num_clasificacion_empresa: data.num_clasificacion_empresa,
        list_forma_pago: JSON.stringify(numFomaPago),
        list_categoria_proveedor: JSON.stringify(numCategoria),
      }
    );
    setStateCrear(false)
    back();
    reset()
  };

  return (
    <Dialog
      open={state}
      maxWidth={"md"}
      TransitionComponent={Transition}
      fullWidth
      fullScreen={fullScreen}
    >
      <FormContainer>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ overflow: "auto" }}
        >
          {step == 1 ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <ToolBarTitle
                modulo="Gestion del sistma"
                subMenu="Registro de proveedor"
                children={
                  <IconButton
                    onClick={() => setStateCrear(false)}
                    size="small"
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
                }
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: fullScreen ? "column" : "row",
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
                      label="Nombre"
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
                  name="identificacion"
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
                      error={errors.identificacion ? true : false}
                      helperText={
                        errors.identificacion
                          ? "Por favor completar el campo"
                          : ""
                      }
                      type="search"
                      autoComplete="off"
                      disabled
                      sx={{ flexGrow: 1 }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: fullScreen ? "column" : "row",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Controller
                  name="num_tipo_empresa"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="num_tipo_empresa">
                        Tipo de empresa
                      </InputLabel>
                      <Select
                        id="num_tipo_empresa"
                        label="Tipo de empresa"
                        size="medium"
                        onChange={onChange}
                        value={value != null || undefined || "" ? value : ""}
                        error={errors.num_tipo_empresa ? true : false}
                        placeholder=" "
                        sx={{ color: "black" }}
                      >
                        {data?.map((x) => (
                          <MenuItem
                            value={x.num_tipo_empresa}
                            key={x.num_tipo_empresa}
                            defaultValue={x.num_tipo_empresa}
                          >
                            {x.nombre_tipo_empresa}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.num_tipo_empresa ? (
                        <FormHelperText sx={{ color: "red" }}>
                          Por favor seleccione una opciòn
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />

                <Controller
                  name="num_clasificacion_empresa"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="num_clasificacion_empresa">
                        Clasificacion de empresa
                      </InputLabel>
                      <Select
                        id="num_clasificacion_empresa"
                        label=" Clasificacion de empresa"
                        size="medium"
                        onChange={onChange}
                        value={value != null || undefined || "" ? value : ""}
                        error={errors.num_clasificacion_empresa ? true : false}
                        placeholder=" "
                        sx={{ color: "black", flexGrow: 1 }}
                        fullWidth
                      >
                        {Clasificacion?.map((x) => (
                          <MenuItem
                            value={x.num_clasificacion_empresa}
                            key={x.num_clasificacion_empresa}
                            defaultValue={x.num_clasificacion_empresa}
                          >
                            {x.nombre_clasificacion_empresa}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.num_clasificacion_empresa ? (
                        <FormHelperText sx={{ color: "red" }}>
                          Por favor seleccione una opciòn
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />
              </Box>
              <Controller
                name="cantidad_dias_espera"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="cantidad_dias_espera"
                    label="Tiempo de entrega en dias"
                    size="medium"
                    //fullWidth
                    onChange={onChange}
                    value={value}
                    error={errors.cantidad_dias_espera ? true : false}
                    helperText={
                      errors.cantidad_dias_espera
                        ? "Por favor completar el campo"
                        : ""
                    }
                    type="number"
                    autoComplete="off"
                    placeholder="Seleccione el colaborador"
                    sx={{ width: fullScreen ? "100%" : "49%" }}
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
                  startIcon={<LastPageIcon />}
                  type="button"
                  onClick={next}
                >
                  Siguiente
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <React.Fragment>
                <ToolBarTitle
                  modulo="Gestion del sistma"
                  subMenu="Registro de proveedor"
                  children={
                    <IconButton
                      onClick={() => back()}
                      size="small"
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
                  }
                />
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5">Seleccion de categorias</Typography>
                </Box>

                <Box
                  sx={{
                    textAlign: "center",
                    maxHeight: fullScreen ? "100%" : "300px",
                    overflow: "auto",
                  }}
                >
                  <TableCustom
                    list={column}
                    children={
                      <TableBodyFrmListModel_Categoria
                        list={newList ? newList : []}
                        lista={setListCategoria}
                      />
                    }
                  />
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5">
                    Seleccion de formas de pago
                  </Typography>
                </Box>

                <Box
                  sx={{
                    textAlign: "center",
                    maxHeight: fullScreen ? "100%" : "300px",
                    overflow: "auto",
                  }}
                >
                  <TableCustom
                    list={columnFormaPago}
                    children={
                      <TableBodyFrmListModel_FormaPago
                        listFormaPago={newListFormaPago ? newListFormaPago : []}
                        Setlista={setListFormaPago}
                      />
                    }
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
                    startIcon={<LastPageIcon />}
                    type="submit"
                  >
                    Guardar
                  </Button>
                </Box>
              </React.Fragment>
            </Box>
          )}
        </Box>
      </FormContainer>
    </Dialog>
  );
};
