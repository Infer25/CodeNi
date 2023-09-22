import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicesCatSituacionClimatica } from "../services";




const { getAll, create, update } = ServicesCatSituacionClimatica;

export function useFetchGetAllSituacionClimatica(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllSituacionClimatica", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateSituacionClimatica() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllSituacionClimatica"] }),
  });
}

export function useUpdateSituacionClimatica() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllSituacionClimatica"] }),
  });
}
