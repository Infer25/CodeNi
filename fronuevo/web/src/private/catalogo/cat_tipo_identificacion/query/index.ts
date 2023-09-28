import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicescattipoIdentificacion } from "../services";



const { getAll, create, update } = ServicescattipoIdentificacion;

export function useFetchGetAllTipoIdentificacion(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllTipoIdentificacion", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateTipoIdentificacion() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllTipoIdentificacion"] }),
  });
}

export function useUpdateTipoIdentificacion() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllTipoIdentificacion"] }),
  });
}
