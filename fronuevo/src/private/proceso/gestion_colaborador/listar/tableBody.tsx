import { StyledTableCell } from "@/shared/components/cell";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { formatoFecha } from "@/shared/utils";
import { ModelApiFrontendPersonaModelApiBackendPersona } from "@/shared/zustand/slice/proceso/gestion_colaborador";
import { Fragment } from "react";

export const TableBodyFrmPersona: React.FC<
  ModelApiFrontendPersonaModelApiBackendPersona
> = ({ rows }) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));
  //const navigate = useNavigate();

  //const setValueUpdate = useStoreGlobal((state) => state.setValueFrmPersonaActualizar);

  /*const goToActualizar = (
    ruta: string,
    id: string,
    nombre: string,
    descrip: string
  ) => {
    //setValueUpdate(+id, nombre, descrip);
    navigate(ruta);
  };*/
  console.log(rows);
  return (
    <TableBody sx={{ overflow: "auto" }}>
      {rows.map((x) => (
        <TableRow key={x.num_persona}>
          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Nombre"} :  ` : ""}
          >
            {x.nombre}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Apellido/Razon social"} :  ` : ""}
          >
            {x.apellido_razonsocial}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Natalicio"} :  ` : ""}
          >
            {x.municipio.nombre}
          </StyledTableCell>
          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"movil"} :  ` : ""}
          >
            {formatoFecha(x.fechanac_fechaconstitucion)}
          </StyledTableCell>
          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"email"} :  ` : ""}
          >
            {x.movil}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"direccion"} :  ` : ""}
          >
            {x.email}
          </StyledTableCell>
          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"direccion"} :  ` : ""}
          >
            {x.direccion}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Fecha registro"} :  ` : ""}
          >
            {formatoFecha(x.fecha_registro)}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Identificacion   : "}` : ""}
            size="medium"
          >
            {x.identificacion.map((y) => (
              <Fragment key={y.pivote.identificacion}>
                <br /> {y.nombre} : {y.pivote.identificacion} 
              </Fragment>
            ))}
          </StyledTableCell>
          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Accion"} :  ` : ""}
          >
            {
              <Tooltip title={"Seleccionar"}>
                <IconButton>
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
