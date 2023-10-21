/*import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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

      {
        id: 4,
        title: "Asignacion de usuario",
        path: "list_colaborador_Usuario",
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
        title: "Consulta",
        path: "listar_colaborador",
        icon: <BadgeSharpIcon fontSize="small" />,

      },
      {
        id: 9,
        title: "Asignacion de cargo",
        path: "list_colaborador",
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
*/
import { PrivateRoutes } from "@/routes/routes";
import BadgeIcon from '@mui/icons-material/Badge';
import BadgeSharpIcon from "@mui/icons-material/BadgeSharp";
import FactoryIcon from '@mui/icons-material/Factory';
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GrainIcon from '@mui/icons-material/Grain';
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
export const navLinks = [
  {
    id: 1,
    title: "G.sistema",
    icon: <SettingsSuggestIcon fontSize="large" />,

    lista: [
      {
        id: 2,
        title: "Catalogo",
        path: `${PrivateRoutes.CATALOGOS}`,
        icon: <SettingsSuggestIcon fontSize="small" />,
      },
      /* {
        id: 3,
        title: "Consultar",
        path: `${PrivateRoutes.COLABORADOR}`,
        icon: <FormatListNumberedIcon fontSize="small" />,
        form: <h1>hola desde consulta </h1>,
      },*/

      {
        id: 3,
        title: "Asignacion de usuario",
        path: "asignacion_usuario",
        icon: <FormatListNumberedIcon fontSize="small" />,
        form: <h1>hola desde consulta </h1>,
      },
    ],
  },
  {
    id: 4,
    title: "G.Proveedor",
    icon: <FactoryIcon fontSize="large" />,
    lista: [
      {
        id: 5,
        title: "Consulta",
        path: "proveedor",
        icon: <BadgeSharpIcon fontSize="small" />,
      },
      {
        id: 6,
        title: "Coordenadas del proveedor",
        path: "proveedor_coordenada",
        icon: <BadgeSharpIcon fontSize="small" />,
      },
      
    ],
  },
  {
    id: 7,
    title: "G.colaborador",
    icon: <BadgeIcon fontSize="large" />,
    lista: [
      {
        id: 8,
        title: "Consulta de colaborador",
        path: "colaborador",
        icon: <BadgeSharpIcon fontSize="small" />,
      },
      {
        id: 9,
        title: "Asignacion de cargo",
        path: "asignacionCargo",
        icon: <BadgeSharpIcon fontSize="small" />,
      },
    ],
  },
  {
    id: 10,
    title: "G.banco de semilla",
    icon: <GrainIcon fontSize="large" />,
    lista: [
      {
        id: 11,
        title: "Mapa",
        path: "mapa",
        icon: <BadgeSharpIcon fontSize="small" />,
      },
      {
        id: 12,
        title: "Coordenadas de rubro",
        path: "rubro_coordenada",
        icon: <BadgeSharpIcon fontSize="small" />,
      },
      
    ],
  },
];
