import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicesCatEstadoCivil } from "../services";




const { getAll, create, update } = ServicesCatEstadoCivil;

export function useFetchGetAllEstadoCivil(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllEstadoCivil", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateEstadoCivil() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllEstadoCivil"] }),
  });
}

export function useUpdateEstadoCivil() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllEstadoCivil"] }),
  });
}
