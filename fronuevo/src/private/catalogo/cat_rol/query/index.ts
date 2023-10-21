import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Servicescatrol } from "../services";


const { getAll, create, update } = Servicescatrol;

export function useFetchGetAllrol(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllrol", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreaterol() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllrol"] }),
  });
}

export function useUpdaterol() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllrol"] }),
  });
}
