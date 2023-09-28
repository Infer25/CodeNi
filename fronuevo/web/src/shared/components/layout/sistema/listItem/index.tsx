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
    title: "G.sistema",
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
    title: "G.cosecha",
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
    title: "G.colaborador",
    icon: <PaidIcon fontSize="large" />,
    lista: [
      {
        id: 8,
        title: "Registro",
        path: "#",
        icon: <BadgeSharpIcon fontSize="small" />,

      },
      {
        id: 9,
        title: "Consulta",
        path: "listar_colaborador",
        icon: <BadgeSharpIcon fontSize="small" />,

      },
    ],
  },
  {
    id: 10,
    title: "G.banco de semilla",
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
