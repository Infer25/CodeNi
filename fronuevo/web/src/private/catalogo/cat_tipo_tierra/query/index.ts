import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicescattipoTierra } from "../services";




const { getAll, create, update } = ServicescattipoTierra;

export function useFetchGetAllTipoTierra(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllTipoTierra", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateTipoTierra() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllTipoTierra"] }),
  });
}

export function useUpdateTipoTierra() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllTipoTierra"] }),
  });
}
