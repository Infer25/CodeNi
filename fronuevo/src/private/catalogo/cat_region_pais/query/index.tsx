import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { regionPais } from "../services/index.js";

const { getAllRegionPais, createRegionPais, updateRegionPais } = regionPais;

export function useFetchGetAllRegionPais(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllRegionPais", criterio, filtro, pagina, cantidadFila],
    () => getAllRegionPais(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateRegionPais() {
  //const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRegionPais,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllRegionPais"] }),
  });
}

export function useUpdateRegionPais() {
  return useMutation({
    mutationFn: updateRegionPais,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllRegionPais"] }),
  });
}
