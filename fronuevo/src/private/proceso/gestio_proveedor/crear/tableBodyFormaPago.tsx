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
import { modelTableListFormaPago } from "./FrmCrearProveedor";

export const TableBodyFrmListModel_FormaPago: React.FC<modelTableListFormaPago> = ({
  listFormaPago,
  Setlista
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));

  const [row_, setRow_] = useState(listFormaPago ? listFormaPago : []);

  useEffect(() => {
    Setlista(row_);
  }, [row_]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const isChecked = event.target.checked;

    setRow_((prevRows) =>
      prevRows?.map((row) =>
        row?.num_forma_pago == +id ? { ...row, isTrue: isChecked } : row
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
            data-titulo={celular ? `${"Forma de pago"} :  ` : ""}
          >
            {x.nombre_forma_pago}
          </StyledTableCell>

          <StyledTableCell
            component="td"
            scope="row"
            data-titulo={celular ? `${"Accion"} :  ` : ""}
            align="right"
          >
            {
              <Tooltip title={"Marcar"}>
                <Checkbox
                  id={x.num_forma_pago.toString()}
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
