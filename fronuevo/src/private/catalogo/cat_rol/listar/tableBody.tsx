import { StyledTableCell } from "@/shared/components/cell";
import { formatoFecha } from "@/shared/utils";
import {
  ModelFrmrolFormulario,
  ModelFrontedrol,
} from "@/shared/zustand/slice/frmCatRol";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  Box,
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
export type ModelTable = {
  setStateRolPermiso: React.Dispatch<React.SetStateAction<boolean>>;
  setValorRolNombre: React.Dispatch<React.SetStateAction<string>>;
  setStateRol_modulo: React.Dispatch<React.SetStateAction<boolean>>;
  setValorRol: React.Dispatch<SetStateAction<number>>;
  setStateUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  List: ModelFrontedrol[];
};
export const TableBodyFrmrol: React.FC<ModelTable> = ({
  setStateRol_modulo,
  setValorRol,
  setStateUpdate,
  setValorRolNombre,
  List,
  setStateRolPermiso,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const metodo = useFormContext<ModelFrmrolFormulario>();

  const { setValue } = metodo;

  const goToActualizar = (id: string, nombre: string, descrip: string) => {
    setValue("num_rol", +id);
    setValue("nombre", nombre);
    setValue("descripcion", descrip);
    setStateUpdate(true);
  };
  const goToAddModulo = (id: number, rol: string) => {
    setValorRol(id);
    setValorRolNombre(rol);
    setStateRol_modulo(true);
  };
  const goToAddPermiso = (id: number, rol: string) => {
    setValorRol(id);
    setValorRolNombre(rol);
    setStateRolPermiso(true);
  };
  return (
    <TableBody sx={{ overflow: "auto" }}>
      {List.map((x, index) => (
        <TableRow key={index}>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"rol"} :  ` : ""}
          >
            {x.Nombre}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Descripcion"} :  ` : ""}
          >
            {x.Descripciòn}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Registrado por"} :  ` : ""}
          >
            {x.RegistradoPor}
          </StyledTableCell>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Fecha registro"} :  ` : ""}
          >
            {x.FechaCreacion ? formatoFecha(x.FechaCreacion) : "-"}
          </StyledTableCell>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Actualizado por"} :  ` : ""}
          >
            {x.ActualizadoPor ? x.ActualizadoPor : "-"}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Fecha actualizacion"} :  ` : ""}
          >
            {x.FechaActualizacion ? formatoFecha(x.FechaActualizacion) : "-"}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Accion"} :  ` : ""}
          >
            {
              <Box>
                <Tooltip title={"Editar"}>
                  <IconButton
                    onClick={() =>
                      goToActualizar(x.id, x.Nombre, x.Descripciòn)
                    }
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Agregar modulo"}>
                  <IconButton onClick={() => goToAddModulo(+x.id, x.Nombre)}>
                    <AddCircleOutlinedIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Agregar permiso"}>
                  <IconButton onClick={() => goToAddPermiso(+x.id, x.Nombre)}>
                    <PostAddIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
