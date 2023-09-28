//import { ColorFondoMadera } from "@/shared/utils/color";
import { styled, TableCell, tableCellClasses } from "@mui/material";
//import  madera from '../../../../assets/madera1.jpg'
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "1.1rem",
    

    // textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    // borderColor: theme.palette.primary.light,
    wordBreak: "break-all",
    //padding:'50px',
  
    fontSize: "1rem",

    ["&:last-child"]: {
      //textAlign: "center",
      

    },
    "&[data-titulo]::before": {
      content: "attr(data-titulo)",
      color:theme.palette.primary.main,
     
    },
  },
}));
