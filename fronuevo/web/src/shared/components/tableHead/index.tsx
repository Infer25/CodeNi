import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { StyledTableCell } from "../cell";
import { ModelTableHeadList } from "./model";

export const TableCustom: React.FC<ModelTableHeadList> = ({
  list,
  children,
}) => {
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <TableContainer
      sx={{
        height: "100%",
        //maxHeight:'30vh',
        minHeight:'20vh',
        paddingX:1,
        
        "&::-webkit-scrollbar": {
          width: 5,
          height: 5,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.common.white,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.action.active,
          borderRadius: 1,
        },
      }}
    >
      <Table
        sx={{
          thead: {
            display: celular ? "none" : "",
          },

          tr: {
            display: celular ? "flex" : "",
            flexDirection: "column",
            border: `1px solid ${theme.palette.primary.main}`,
            padding: 1,
            margin: 1,
         
          },
        }}
        aria-label="simple table"
        stickyHeader
        
      >
        <TableHead>
          <TableRow>
            {list.map((x) => (
              <StyledTableCell key={x.id}> {x.title}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
      </Table>
    </TableContainer>
  );
};
