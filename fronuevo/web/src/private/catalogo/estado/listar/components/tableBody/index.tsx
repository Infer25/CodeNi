import { StyledTableCell } from "@/shared/components/cell";
import { formatoFecha } from "@/shared/utils";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ModelTableRowListFrmEstado } from "./models";
import { useStoreGlobal } from "@/shared/zustand/store";

export const TableBodyFrmEstado: React.FC<ModelTableRowListFrmEstado> = ({
  List,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const setValueUpdate = useStoreGlobal((state) => state.setValueFrmEstado);
  const goToActualizar = (
    ruta: string,
    id: string,
    nombre: string,
    descrip: string
  ) => {
    setValueUpdate(id, nombre, descrip);
    navigate(ruta);
  };

  return (
    <TableBody sx={{ overflow: "auto" }} >
      {List.map((x) => (
        <TableRow key={x.id}>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Nombre"} :  ` : ""}
          >
            {x.Estado}
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
            data-titulo={celular ? `${"Registrado Por"} :  ` : ""}
          >
            {x["registrado por"]}
          </StyledTableCell>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Fecha registro"} :  ` : ""}
          >
            {x["Fecha de registro"]
              ? formatoFecha(x["Fecha de registro"])
              : "-"}
          </StyledTableCell>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Actualizado por"} :  ` : ""}
          >
            {x.actualizadopor ? x.actualizadopor : "-"}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Fecha actualizacion"} :  ` : ""}
          >
            {x.ultimafechaactualizacion
              ? formatoFecha(x.ultimafechaactualizacion)
              : "-"}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Accion"} :  ` : ""}
          >
            {
              <Tooltip title={"Seleccionar"}>
                <IconButton
                  onClick={() =>
                    goToActualizar("actualizar", x.id, x.Estado, x.Descripciòn)
                  }
                >
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            }
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
