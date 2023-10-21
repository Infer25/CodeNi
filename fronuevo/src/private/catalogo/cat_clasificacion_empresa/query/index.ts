import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Servicesclasificacion_empresa } from "../services";


const { getAll, create, update } = Servicesclasificacion_empresa ;

export function useFetchGetAllclasificacion_empresa (
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllclasificacion_empresa ", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateclasificacion_empresa () {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllclasificacion_empresa "] }),
  });
}

export function useUpdateclasificacion_empresa () {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllclasificacion_empresa "] }),
  });
}
