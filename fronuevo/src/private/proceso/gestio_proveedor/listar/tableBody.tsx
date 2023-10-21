import { StyledTableCell } from "@/shared/components/cell";
import {
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  CrearProveedor,
  ModelApiFrontendProveedorListPersona,
} from "@/shared/zustand/slice/proceso/frm_proveedor";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Fragment, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
type Props = {
  setProveedorState: React.Dispatch<SetStateAction<boolean>>;
};
export const TableBodyFrmPersonaProveedor: React.FC<
  ModelApiFrontendProveedorListPersona & Props
> = ({ rows, setProveedorState }) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const metodo = useFormContext<CrearProveedor>();

  const { setValue } = metodo;

  const goToCrearProveedor = (
    id: string,
    nombre: string,
    identificacion: string
  ) => {
    setValue("num_persona", id);
    setValue("nombre", nombre);
    setValue("identificacion", identificacion);
    setProveedorState(true);
  };
  return (
    <TableBody sx={{ overflow: "auto" }}>
      {rows.map((x) => (
        <TableRow key={x.num_persona}>
          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Nombre"} :  ` : ""}
          >
            {x.nombre_completo}
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
                <IconButton
                  size="large"
                  onClick={() =>
                    goToCrearProveedor(
                      x.num_persona,
                      x.nombre_completo,
                      x.identificacion
                        .map((z) => z.nombre + ":" + z.pivote.identificacion)
                        .toString()
                    )
                  }
                >
                  <AddBusinessIcon color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
            }
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
