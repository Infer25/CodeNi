import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Servicestipo_empresa } from "../services";


const { getAll, create, update } = Servicestipo_empresa;

export function useFetchGetAlltipo_empresa(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAlltipo_empresa", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreatetipo_empresa() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAlltipo_empresa"] }),
  });
}

export function useUpdatetipo_empresa() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAlltipo_empresa"] }),
  });
}
