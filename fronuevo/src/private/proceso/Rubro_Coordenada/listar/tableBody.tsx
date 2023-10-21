import { StyledTableCell } from "@/shared/components/cell";
import {
  ModelFrmrol_Tbl_rubro_coordenada_Crear,
  Tbl_rubro_coordenada_Frontend,
} from "@/shared/zustand/slice/Rubro_Coordenada";

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
  List: Tbl_rubro_coordenada_Frontend[];
};
export const TableBodyFrmRubroCoordenada: React.FC<ModelTable> = ({
  setStateUpdate,
  List,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const metodo = useFormContext<ModelFrmrol_Tbl_rubro_coordenada_Crear>();

  const { setValue } = metodo;

  const goToActualizar = (
    id: string,
    num_rubro: string,
    num_departamento: string,
    latitud: string,
    longitud: string
  ) => {
    setValue("num_rubro_coordenada", id);
    setValue("num_rubro", num_rubro);
    setValue("num_departamento", num_departamento);
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
            {x.ModelDepartamento.nombre}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Rubro"} :  ` : ""}
          >
            {x.ModelRubro.nombre}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Coordenada"} :  ` : ""}
          >
            {"(" + x.coordenada.x + "," + x.coordenada.y + ")"}
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
                      x.num_rubro_coordenada.toString(),
                      x.num_rubro,
                      x.num_departamento_region.toString(),
                      x.coordenada.x!,
                      x.coordenada.y!
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
