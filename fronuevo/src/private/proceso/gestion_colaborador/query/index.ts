import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicesPersona } from "../services";
import { queryClient } from "@/config";




const { getAll,getAllMunicipio,getAllTipoIdentificacion,create,getAllestadoCivil ,getAllTipoColaborador} = ServicesPersona;

export function useFetchGetAllPersona(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllPersona", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useFetchGetAllOnlyMunicipio() {
  return useQuery(["getAllOnlyMunicipio"], getAllMunicipio,{
    cacheTime:1000
  });
}
export function useFetchGetAllOnlyTipoColaborador() {
  return useQuery(["getAllTipoColaborador"], getAllTipoColaborador,{
    cacheTime:1000
  });
}
export function useFetchGetAllOnlyEstadoCivil() {
  return useQuery(["getAllOnlyEstadoCivil"], getAllestadoCivil,{
    cacheTime:1000
  });
}

export function useFetchGetAllOnlyTipoIdentificacion() {
  return useQuery(["getAllOnlyTipoIndetificacion"], getAllTipoIdentificacion,{
    cacheTime:1000
  });
}

export function useCreatePersona() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllPersona"] }),
  });
}