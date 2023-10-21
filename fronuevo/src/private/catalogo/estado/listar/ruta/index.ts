import { PrivateRoutes } from "@/routes/routes";

export const rutaFrmEstado = [
  {
    id: 1,
    title: "Sistema",
    ruta: "/sistema",
  },
  {
    id: 2,
    title: "Catalogo",
    // ruta:"/sistema/viewCatalogo"
    ruta: `../${PrivateRoutes.CATALOGOS}`,
  },
  {
    id: 3,
    title: "Listar estado",
    ruta: "",
  },
];
