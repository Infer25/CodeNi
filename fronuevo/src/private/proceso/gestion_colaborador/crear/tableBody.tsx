import { StyledTableCell } from "@/shared/components/cell";
import { ModelTableBodyAgregarIdentificacion } from "@/shared/zustand/slice/proceso/gestion_colaborador";
import { useStoreGlobal } from "@/shared/zustand/store";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const TableBodyFrmAgregarIdnetificacion: React.FC<
  ModelTableBodyAgregarIdentificacion
> = ({ list, setOpenAlertopenAlertError, setOpenAlert }) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const { deleteOne } = useStoreGlobal((state) => ({
    deleteOne: state.clearOnlyOneListFrmAgregarIdentificacion,
  }));

  const deleteOneRow = (id: string) => {
    setOpenAlert(true);
    setOpenAlertopenAlertError({ state: "success", title: "Eliminado" });
    deleteOne(id);
   // setCountPersona(list.length+1)
  };
  return (
    <TableBody sx={{ overflow: "auto",maxHeight:'100px' }}>
      {list.map((x, index) => (
        <TableRow key={index}>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Tipo de identificacion"} :  ` : ""}
          >
            {x.nombre_identificacion}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Identificacion"} :  ` : ""}
          >
            {x.identificacion}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Accion"} :  ` : ""}
          >
            {
              <Tooltip title={"Eliminar"}>
                <IconButton
                  onClick={() =>
                    deleteOneRow(
                      x.nombre_identificacion ? x.nombre_identificacion : "0"
                    )
                  }
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            }
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
