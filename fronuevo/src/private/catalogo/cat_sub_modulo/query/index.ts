import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Servicescatsub_modulo } from "../services";

const { getAll, create, update, getAllOnly_modulo } = Servicescatsub_modulo;

export function useFetchGetAllsub_modulo(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllsub_modulo", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreatesub_modulo() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllsub_modulo"] }),
  });
}

export function useUpdatesub_modulo() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllsub_modulo"] }),
  });
}

export function useFetchGetAllOnlyModulo() {
  return useQuery(["getAllOnlyModulo"], getAllOnly_modulo);
}
