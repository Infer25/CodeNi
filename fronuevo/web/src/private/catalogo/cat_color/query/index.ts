import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicescatColor } from "../services";


const { getAll, create, update } = ServicescatColor;

export function useFetchGetAllColor(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllColor", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateColor() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllColor"] }),
  });
}

export function useUpdateColor() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllColor"] }),
  });
}
