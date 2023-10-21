import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Transition } from "@/shared/components/transition";

import { TableCustom } from "@/shared/components/tableHead";
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Cat_usuario } from "@/shared/zustand/slice/frmCatUsuario";
import { useCreateUsuario, useFetchGetAllOnlyrol } from "../query";
import { column } from "./column";
import { rutaFrmCrearUsuario } from "./ruta";
import { TableBodyFrmListRol } from "./tableBody";

interface FrmUsuario {
  state: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface modelTable {
  isTrue: boolean;
  num_rol: string;
  nombre_rol: string;
}
export interface modelTableList {
  setlista: React.Dispatch<React.SetStateAction<modelTable[]>>;
  list: modelTable[];
}

export const FrmCrearRol_Usuario: React.FC<FrmUsuario> = ({
  state,
  changeState,
}) => {
  const { data } = useFetchGetAllOnlyrol();

  const newList = data?.rows.map((obj) => {
    return { ...obj, isTrue: true };
  });

  const [li, setLi] = useState<modelTable[]>(newList ? newList : []);
  const theme = useTheme();
  //const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const metodo = useFormContext<Cat_usuario>();

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = metodo;

  const { mutate: crear } = useCreateUsuario();

  const onSubmit = (data: Cat_usuario) => {
    const numpermisos = li
      .filter((obj) => obj.isTrue)
      .map((obj, i) => {
        return { id: i + 1, num_rol: obj.num_rol };
      });

    if (data.num_colaborador != "" && numpermisos.length > 0) {
      crear({
        num_colaborador: data.num_colaborador,
        usuario: data.usuario,
        pass: data.pass,
        list_rol: JSON.stringify(numpermisos),
        nombre_colaborador: "",
      });
      reset();
      changeState(false);
    } else {
      alert("no valido");
    }
  };
  const limpiar = () => {
    //setValue("num_usuario", 0);
    //setValue("list_rol", "");
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={state}
      maxWidth={"md"}
      TransitionComponent={Transition}
      fullWidth
      fullScreen={fullScreen}
    >
      <FormContainer>
        <ToolBarTitle
          modulo="Gestion del sistma"
          subMenu="Actualizacion de num_rol"
          url={rutaFrmCrearUsuario}
          children={
            <IconButton
              onClick={() => changeState(false)}
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
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              gap: 1,
            }}
          >
            <Controller
              name="nombre_colaborador"
              control={control}
              //rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="nombre_colaborador"
                  label="Colaborador"
                  size="small"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={errors.nombre_colaborador ? true : false}
                  helperText={
                    errors.nombre_colaborador ? "Por favor completar el campo" : ""
                  }
                  placeholder="Aqui"
                  disabled
                  sx={{ mx: 1, width: "98%" }}
                />
              )}
            />
            <Controller
              name="usuario"
              control={control}
              defaultValue={""}
              //rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="usuario"
                  label="usuario"
                  size="small"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={errors.usuario ? true : false}
                  helperText={
                    errors.usuario ? "Por favor completar el campo" : ""
                  }
                  placeholder="Aqui"
                  sx={{ mx: 1, width: "98%" }}
                />
              )}
            />

            <Controller
              name="pass"
              control={control}
              //rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="pass"
                  label="Contraseña"
                  size="small"
                  //fullWidth
                  onChange={onChange}
                  //defaultValue={getValue}
                  value={value}
                  error={errors.pass ? true : false}
                  helperText={errors.pass ? "Por favor completar el campo" : ""}
                  type="search"
                  autoComplete="off"
                  placeholder=""
                  sx={{ mx: 1, width: "98%" }}
                />
              )}
            />
            <TableCustom
              list={column}
              children={
                <TableBodyFrmListRol
                  list={newList ? newList : []}
                  setlista={setLi}
                />
              }
            />
            <Box
              sx={{
                display: "flex",
                gap: 4,
                justifyContent: "flex-end",
                flexGrow: 1,
                mb: 1,
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
    </Dialog>
  );
};
