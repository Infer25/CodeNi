import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dptoRegion } from "../services";

const { getAllDptoRegion, createDptoRegion, updateDptoRegion, getAllRegion } =
  dptoRegion;

export function useFetchGetAllDptoRegion(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
)

{
  return useQuery(
    ["getAllDptoRegion", criterio, filtro, pagina, cantidadFila],
    () => getAllDptoRegion(criterio, filtro, pagina, cantidadFila)
  );

}

export function useCreateDptoRegion() {
  //const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDptoRegion,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllDptoRegion"] }),
  });
}

export function useUpdateDptoRegion() {
  return useMutation({
    mutationFn: updateDptoRegion,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllDptoRegion"] }),
  });
}

export function useFetchGetAllOnlyRegion() {
  return useQuery(["getAllOnlyRegion"], getAllRegion,{
    cacheTime:1000
  });
}
