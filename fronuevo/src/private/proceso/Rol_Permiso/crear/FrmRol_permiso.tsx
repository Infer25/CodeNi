import { FormContainer } from "@/shared/components/Frm";
import { ToolBarTitle } from "@/shared/components/ToolBarTitle";
import { Transition } from "@/shared/components/transition";

import { TableCustom } from "@/shared/components/tableHead";
import { ModelFrmrol_permiso_Formulario } from "@/shared/zustand/slice/frm_rol_permiso";
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
import { Controller, useForm } from "react-hook-form";
import { useCreate_tbl_rol_permiso, useFetchGetAllOnlypermiso } from "../query";
import { column } from "./column";
import { TableBodyFrmListpermiso_permiso } from "./tableBody";

interface updateFrmActualizarnum_rol {
  valorRolNombre: string;
  valorRol: number;
  state: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface modelTable {
  isTrue: boolean;
  num_permiso: string;
  nombre_permiso: string;
}
export interface modelTableList {
  lista: React.Dispatch<React.SetStateAction<modelTable[]>>;
  list: modelTable[];
}

export const FrmCrearRol_permiso: React.FC<updateFrmActualizarnum_rol> = ({
  valorRol,
  state,
  changeState,
  valorRolNombre,
}) => {
  const { data } = useFetchGetAllOnlypermiso();

  const newList = data?.rows.map((obj) => {
    return { ...obj, isTrue: true };
  });
  const [li, setLi] = useState<modelTable[]>(newList ? newList : []);
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ModelFrmrol_permiso_Formulario>();

  const { mutate: crear } = useCreate_tbl_rol_permiso();

  const onSubmit = (data: ModelFrmrol_permiso_Formulario) => {
    const numpermisos = li
      .filter((obj) => obj.isTrue)
      .map((obj, i) => {
        return { id: i + 1, num_permiso: obj.num_permiso };
      });

    if (data.num_rol != 0 && numpermisos.length > 0) {
      crear({
        num_rol: valorRol,
        list_permiso: JSON.stringify(numpermisos),
      });
      reset();
      changeState(false);
    } else {
      alert("no valido");
    }
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
          subMenu="Asignacion de permisos a un rol"
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
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Controller
              name="num_rol"
              control={control}
              //rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="num_rol"
                  label="Rol"
                  size="small"
                  //fullWidth
                  onChange={onChange}
                  defaultValue={valorRolNombre}
                  value={value}
                  error={errors.num_rol ? true : false}
                  helperText={
                    errors.num_rol ? "Por favor completar el campo" : ""
                  }
                  type="search"
                  autoComplete="off"
                  placeholder=""
                  disabled
                  sx={{ mx: 1, width: celular ? "97%" : "50%" }}
                />
              )}
            />

            <TableCustom
              list={column}
              children={
                <TableBodyFrmListpermiso_permiso
                  list={newList ? newList : []}
                  lista={setLi}
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
