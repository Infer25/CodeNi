import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import { StyledTableCell } from "@/shared/components/cell";
import {
  ModelFrmHistorialCargoFormulario,
  ModelFrontedCargoEmpleado,
} from "@/shared/zustand/slice/proceso/gestion_colaborador/frmAsignacionCargo";

import {
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

export type ModelTable = {
  setStateCrear: React.Dispatch<React.SetStateAction<boolean>>;
  List: ModelFrontedCargoEmpleado[];
};
export const TableBodyFrmCargoColaborador: React.FC<ModelTable> = ({
  setStateCrear,
  List,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const metodo = useFormContext<ModelFrmHistorialCargoFormulario>();

  const { setValue } = metodo;

  const goToCreate = (
    id: number,
    nombre: string,
    apellido: string,
    cedula: string
  ) => {
    setValue("num_colaborador", id.toString());
    setValue("nombre", nombre + " " + apellido);
    setValue("cedula", cedula);
    setStateCrear(true);
  };

  return (
    <TableBody sx={{ overflow: "auto" }}>
      {List.map((x, index) => (
        <TableRow key={index}>
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
                  onClick={() =>
                    goToCreate(
                      x.colaborador_persona.num_colaborador,
                      x.nombre,
                      x.apellido_razonsocial,
                      x.identificacion
                        .map(
                          (y) =>
                            y.nombre.toString() +
                            ": " +
                            y.pivote.identificacion.toString()
                        )
                        .toString()
                    )
                  }
                  size="large"
                >
                  <AddCircleOutlineRoundedIcon
                    color="primary"
                    fontSize="large"
                  />
                </IconButton>
              </Tooltip>
            }
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
