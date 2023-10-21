import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Servicescatcargo } from "../services";


const { getAll, create, update,getAllArea } = Servicescatcargo;

export function useFetchGetAllcargo(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllcargo", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreatecargo() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllcargo"] }),
  });
}

export function useUpdatecargo() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllcargo"] }),
  });
}
export function useFetchGetAllOnlyArea() {
  return useQuery(["getAllAreaCargo"], getAllArea);
}
