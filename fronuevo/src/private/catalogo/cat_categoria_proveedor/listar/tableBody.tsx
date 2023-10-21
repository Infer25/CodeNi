import { StyledTableCell } from "@/shared/components/cell";
import { formatoFecha } from "@/shared/utils";
import { ModelFrmcategoria_proveedorFormulario, ModelFrontedcategoria_proveedor } from "@/shared/zustand/slice/frmCatCategoriaProveedor";

import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
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
  List: ModelFrontedcategoria_proveedor[];
};
export const TableBodyFrmcategoria_proveedor: React.FC<ModelTable> = ({
  setStateUpdate,
  List,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const metodo = useFormContext<ModelFrmcategoria_proveedorFormulario>();

  const { setValue } = metodo;

  const goToAdd= (id: string, nombre: string, descrip: string) => {
    setValue("num_categoria_proveedor", +id);
    setValue("nombre", nombre);
    setValue("descripcion", descrip);
    setStateUpdate(true);
  };
 
  
  return (
    <TableBody sx={{ overflow: "auto" }}>
      {List.map((x, index) => (
        <TableRow key={index}>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"categoria_proveedor"} :  ` : ""}
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
                      goToAdd(x.id, x.Nombre, x.Descripciòn)
                    }
                  >
                    <EditIcon color="primary" />
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
