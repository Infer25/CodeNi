import { useQuery } from "@tanstack/react-query";
import { ServicesProveedorCoordenada } from "../services";

const { getAll} = ServicesProveedorCoordenada;

export function useFetchGetAllProveedorCoordenada(
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    return useQuery(
      ["getAllProveedorCoordenada", criterio, filtro, pagina, cantidadFila],
      () => getAll(criterio, filtro, pagina, cantidadFila)
    );
  }