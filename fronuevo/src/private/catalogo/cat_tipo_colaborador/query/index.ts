import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ServicescatTipoColaborador } from "../services";



const { getAll, create, update } = ServicescatTipoColaborador;

export function useFetchGetAllTipocolaborador(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllTipocolaborador", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateTipocolaborador() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllTipocolaborador"] }),
  });
}

export function useUpdateTipocolaborador() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllTipocolaborador"] }),
  });
}
