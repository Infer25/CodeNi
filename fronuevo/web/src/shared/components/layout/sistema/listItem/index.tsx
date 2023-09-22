import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BadgeSharpIcon from "@mui/icons-material/BadgeSharp";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GroupIcon from "@mui/icons-material/Group";
import LineAxisOutlinedIcon from "@mui/icons-material/LineAxisOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

export const navLinks = [

  {
    id: 1,
    title: "Gestion del sistema",
    icon: <LineAxisOutlinedIcon fontSize="large"  />,

    lista: [
      {
        id: 2,
        title: "Catalogo",
        path: "viewCatalogo",
        icon: <AddCircleOutlineIcon fontSize="small" />,
      },
      {
        id: 3,
        title: "Consultar",
        path: "consulta",
        icon: <FormatListNumberedIcon fontSize="small" />,
        form: <h1>hola desde consulta </h1>,
      },
    ],
  },
  {
    id: 4,
    title: "Gestion de cosecha",
    icon: <GroupIcon fontSize="large" />,
    lista: [
      {
        id: 5,
        title: "Registro de cliente",
        path: "gestionEmpleado",
        icon: <BadgeSharpIcon fontSize="small" />,

      },
      {
        id: 6,
        title: "consulta",
        path: "gestionEmpleado",
        icon: <BadgeSharpIcon fontSize="small" />,

      },
    ],
  },
  {
    id: 7,
    title: "Gestion de caja",
    icon: <PaidIcon fontSize="large" />,
    lista: [
      {
        id: 8,
        title: "Registro de caja",
        path: "gestionEmpleado",
        icon: <BadgeSharpIcon fontSize="small" />,

      },
      {
        id: 9,
        title: "consulta caja",
        path: "gestionEmpleado",
        icon: <BadgeSharpIcon fontSize="small" />,

      },
    ],
  },
  {
    id: 10,
    title: "Gestion del sistema/",
    icon: <SettingsSuggestIcon fontSize="large" />,
    lista: [

      {
        id: 11,
        title: "Catalogos",
        path: "catalogo",
        icon: <BadgeSharpIcon fontSize="small" />,
      },
    ],
  },
];
