import { StyledTableCell } from "@/shared/components/cell";
import { formatoFecha } from "@/shared/utils";
import { ModelFrmTipocolaboradorFormulario } from "@/shared/zustand/slice/frmTipoColaborador";

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

export type ModelTableRow = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelTable = {
  setStateUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  List: ModelTableRow[];
};
export const TableBodyFrmTipocolaborador: React.FC<ModelTable> = ({
  setStateUpdate,
  List,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));
  //const navigate = useNavigate();

  //const setValueUpdate = useStoreGlobal((state) => state.setValueFrmTipocolaboradorActualizar);

  const metodo = useFormContext<ModelFrmTipocolaboradorFormulario>();
  const { setValue } = metodo;

  const goToActualizar = (id: string, nombre: string, descrip: string) => {
    setValue("num_tipo_colaborador", +id);
    setValue("nombre", nombre);
    setValue("descripcion", descrip);
    setStateUpdate(true);
  };

  return (
    <TableBody sx={{ overflow: "auto" }}>
      {List.map((x) => (
        <TableRow key={x.id}>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Tipo de colaborador"} :  ` : ""}
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
                  onClick={() => goToActualizar(x.id, x.Nombre, x.Descripciòn)}
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

//onClick={() => goToActualizar("actualizar", x.id, x.Nombre, x.Descripciòn)}
