import { useMutation, useQuery } from "@tanstack/react-query";

import { ServicesCargoColaborador } from "../services";
import { queryClient } from "@/config";

const { getAll, create, getAllArea, getAllCargoArea } =
  ServicesCargoColaborador;

export function useFetchGetAllCargoColaborador(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllCargoColaborador", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}
export function useCreateAsignacionCargo() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllCargoColaborador"] }),
  });
}

export function useFetchGetAllOnlyArea() {
  return useQuery(["getAllArea"], getAllArea);
}

export function useFetchGetAllOnlyCargoFiltroArea(id:number) {
  return useQuery(
    ["getAllCargoArea",id],
    () => getAllCargoArea(id)
  );
}
