import { StyledTableCell } from "@/shared/components/cell";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
  IconButton,
  TableBody,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ModelTableRowList } from "./models";

export const TableBodyCustom: React.FC<ModelTableRowList> = ({ List }) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const goTo = (ruta: string) => {
    navigate(ruta);
  };
  return (
    <TableBody sx={{ overflow: "auto" }}>
      {List.map((x) => (
        <TableRow key={x.id}>
          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${'Catalogo'} :  ` : ""}
          >
            {x.title}
          </StyledTableCell>

          <StyledTableCell
            component="th"
            scope="row"
            data-titulo={celular ? `${"Accion"} :  ` : ""}
          >
            {
              <Tooltip title={"Seleccionar"}>
                <IconButton onClick={() => goTo(x.ruta)}>
                  <DoubleArrowIcon fontSize="large" color="primary" />
                </IconButton>
              </Tooltip>
            }
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
