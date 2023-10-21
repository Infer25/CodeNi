import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Servicescategoria_proveedor } from "../services";


const { getAll, create, update } = Servicescategoria_proveedor;

export function useFetchGetAllcategoria_proveedor(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllcategoria_proveedor", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreatecategoria_proveedor() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllcategoria_proveedor"] }),
  });
}

export function useUpdatecategoria_proveedor() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllcategoria_proveedor"] }),
  });
}
