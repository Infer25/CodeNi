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

import { useStoreGlobal } from "@/shared/zustand/store";

export type ModelTableRowFrmDptoRegion = {
  id: string;
  region: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
  Region: {
    nombre: string;
  };
};

export type ModelTableRowListFrmDpto = {
  List: ModelTableRowFrmDptoRegion[];
};
export const TableBodyFrmDptoRegion: React.FC<ModelTableRowListFrmDpto> = ({
  List,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const setValueUpdate = useStoreGlobal(
    (state) => state.setValueFrmDptoRegionActualizar
  );

  const goToActualizar = (
    ruta: string,
    id: string,
    num_region: string,
    region: string,
    nombre: string,
    descrip: string
  ) => {
    setValueUpdate(id, num_region, region, nombre, descrip);
    navigate(ruta);
  };

  return (
    <TableBody sx={{ overflow: "auto" }}>
      {List.map((x) => (
        <TableRow key={x.id}>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Region"} :  ` : ""}
          >
            {x.Region.nombre}
          </StyledTableCell>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Nombre"} :  ` : ""}
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
            data-titulo={celular ? `${"Registrado"} :  ` : ""}
          >
            {x["Registrado"]}
          </StyledTableCell>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Creacion"} :  ` : ""}
          >
            {x["Creacion"] ? formatoFecha(x["Creacion"]) : "-"}
          </StyledTableCell>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Actualizado"} :  ` : ""}
          >
            {x["Actualizado"] ? x["Actualizado"] : "-"}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Actualizacion"} :  ` : ""}
          >
            {x["Actualizacion"] ? formatoFecha(x["Actualizacion"]) : "-"}
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
                    goToActualizar(
                      "actualizar",
                      x.id,
                      x.region,
                      x.Region.nombre,
                      x.Nombre,
                      x.Descripciòn
                    )
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
