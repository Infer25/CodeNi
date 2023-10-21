import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Servicescatmodulo } from "../services";


const { getAll, create, update } = Servicescatmodulo;

export function useFetchGetAllmodulo(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllmodulo", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreatemodulo() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllmodulo"] }),
  });
}

export function useUpdatemodulo() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllmodulo"] }),
  });
}
