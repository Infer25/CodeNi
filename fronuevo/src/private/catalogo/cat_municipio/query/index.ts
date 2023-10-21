import { queryClient } from "@/config/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MunicipioServices } from "../services";


const { getAllMunicipio, createMunicipio, updateMunicipio, getAllDepartamento } =
MunicipioServices;

export function useFetchGetAllMunicipio(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
)

{
  return useQuery(
    ["getAllMunicipio", criterio, filtro, pagina, cantidadFila],
    () => getAllMunicipio(criterio, filtro, pagina, cantidadFila)
  );

}

export function useCreateMunicipio() {
  return useMutation({
    mutationFn: createMunicipio,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllMunicipio"] }),
  });
}

export function useUpdateMunicipio() {
  return useMutation({
    mutationFn: updateMunicipio,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllMunicipio"] }),
  });
}

export function useFetchGetAllOnlyDepartamento() {
  return useQuery(["getAllOnlyDepartamento"], getAllDepartamento,{
    cacheTime:1000
  });
}
