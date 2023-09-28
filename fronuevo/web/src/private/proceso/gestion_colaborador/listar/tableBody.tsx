import { StyledTableCell } from "@/shared/components/cell";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { formatoFecha } from "@/shared/utils";
import { ModelIdentificacion } from "@/shared/zustand/slice/proceso/gestion_colaborador";

export type ModelTableRow = {
  num_persona: number;
  fechanac_fechaconstitucion: string;
  origen: number;
  nombre: string;
  apellido_razonsocial: string;
  movil: string;
  email: string;
  direccion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  municipio: {
    nombre: string;
  };
  persona_identificador: ModelIdentificacion[];
};

export type ModelTable = {
  List: ModelTableRow[];
};
export const TableBodyFrmPersona: React.FC<ModelTable> = ({ List }) => {
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

  return (
    <TableBody sx={{ overflow: "auto" }}>
      {List.map((x) => (
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
            data-titulo={celular ? `${"Identificacion"}` : ""}

            size="medium"
          >
            {x.persona_identificador.map((y) =>
              y.tipo_identificador.map((j) => (
                <Typography variant="body1" color="initial" sx={{textAlign:'justify'}} key={j.nombre}>
                  {j.nombre + ' : '+y.identificacion}
                </Typography>
              ))
            )}
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
