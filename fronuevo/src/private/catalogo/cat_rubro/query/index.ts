import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RubroServices } from "../services";

const { getAll, create, update, getAllTipoRubro } = RubroServices;

export function useFetchGetAllRubro(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(["getAllRubro", criterio, filtro, pagina, cantidadFila], () =>
    getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateRubro() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllRubro"] }),
  });
}

export function useUpdateRubro() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllRubro"] }),
  });
}

export function useFetchGetAllOnlyTipoRubro() {
  return useQuery(["getAllOnlyTipoRubro"], getAllTipoRubro, {
    cacheTime: 1000,
  });
}
