import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CatTipoRubro } from "../services";

const { getAll, create, update } = CatTipoRubro;

export function useFetchGetAllTipoRubro(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllTipoRubro", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateTipoRubro() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllTipoRubro"] }),
  });
}

export function useUpdateTipoRubro() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllTipoRubro"] }),
  });
}
