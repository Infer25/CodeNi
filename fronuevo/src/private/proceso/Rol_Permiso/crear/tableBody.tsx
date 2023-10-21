/* eslint-disable react-hooks/exhaustive-deps */
import { StyledTableCell } from "@/shared/components/cell";
import {
  Checkbox,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { modelTableList } from "./FrmRol_permiso";

export const TableBodyFrmListpermiso_permiso: React.FC<modelTableList> = ({
  list,
  lista,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const [row_, setRow_] = useState(list ? list : []);

  useEffect(() => {
    lista(row_);
  }, [row_]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const isChecked = event.target.checked;

    setRow_((prevRows) =>
      prevRows?.map((row) =>
        row.num_permiso == id ? { ...row, isTrue: isChecked } : row
      )
    );
  };

  return (
    <TableBody sx={{ overflow: "auto", maxHeight: "100px" }}>
      {row_?.map((x, index) => (
        <TableRow key={index}>
          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Permiso"} :  ` : ""}
          >
            {x.nombre_permiso}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Accion"} :  ` : ""}
          >
            {
              <Tooltip title={"Marcar"}>
                <Checkbox
                  id={x.num_permiso.toString()}
                  onChange={handleCheckboxChange}
                  checked={x.isTrue}
                  size="medium"
                />
              </Tooltip>
            }
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
