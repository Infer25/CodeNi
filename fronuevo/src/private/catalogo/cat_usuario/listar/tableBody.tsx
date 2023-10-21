import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import { StyledTableCell } from "@/shared/components/cell";

import { ModelFrontedEmpleadoBase } from "@/shared/zustand/slice/Colaborador_Base";
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
import { Cat_usuario } from "@/shared/zustand/slice/frmCatUsuario";

export type ModelTable = {
  setStateCrear: React.Dispatch<React.SetStateAction<boolean>>;
  List: ModelFrontedEmpleadoBase[];
};

export const TableBodyFrmUsuarioColaborador: React.FC<ModelTable> = ({
  setStateCrear,
  List,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));
  const metodo = useFormContext<Cat_usuario>();

  const { setValue } = metodo;

  const goToCreate = (
    id: number,
    nombre: string,
    apellido: string,

  ) => {
    setValue("num_colaborador", id.toString());
    setValue("nombre_colaborador", nombre + " " + apellido);
    
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
                  size="large"
                  onClick={() =>
                    goToCreate(
                      x.colaborador_persona.num_colaborador,
                      x.nombre,
                      x.apellido_razonsocial
                     
                    )
                  }
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
/*
 x.identificacion
                        .map(
                          (y) =>
                            y.nombre.toString() +
                            ": " +
                            y.pivote.identificacion.toString()
                        )
                        .toString()
                  */
