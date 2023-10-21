import { StyledTableCell } from "@/shared/components/cell";
import {
  ModelCrearProveedorCoordenada,
  ProveedorCoordenadaFrontend,
} from "@/shared/zustand/slice/proveedor_ubicacion";

import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

export type ModelTable = {
  setStateUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  List: ProveedorCoordenadaFrontend[];
};
export const TableBodyFrmProveedorCoordenada: React.FC<ModelTable> = ({
  setStateUpdate,
  List,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const metodo = useFormContext<ModelCrearProveedorCoordenada>();

  const { setValue } = metodo;

  const goToActualizar = (
    num_Proveedor: string,
    latitud: string,
    longitud: string
  ) => {
    setValue("num_proveedor", num_Proveedor);
    setValue("latitud", latitud);
    setValue("longitid", longitud);
    setStateUpdate(true);
  };

  return (
    <TableBody sx={{ overflow: "auto" }}>
      {List.map((x, index) => (
        <TableRow key={index}>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Departamento"} :  ` : ""}
          >
            {x.Persona_Proveedor.nombre}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Proveedor"} :  ` : ""}
          >
            {x.Model_cattipo_empresa.nombre_tipo_empresa}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Coordenada"} :  ` : ""}
          >
            {/*"(" + x.coordenada.x + "," + x.coordenada.y + ")"*/}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Accion"} :  ` : ""}
          >
            {
              <Tooltip title={"Seleccionar"}>
                <IconButton
                  onClick={() => goToActualizar(x.num_proveedor, "1", "1")}
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
