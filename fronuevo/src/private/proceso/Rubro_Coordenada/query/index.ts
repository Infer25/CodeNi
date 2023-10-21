import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicesRubroCoordenada } from "../services";
import { queryClient } from "@/config";


const { getAll,getAllRubro ,getAllDepartamento,create,update} = ServicesRubroCoordenada;

export function useFetchGetAllRubroCoordenada(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllRubroCoordenada", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}
export function useFetchGetAllgetRubro() {
  return useQuery(["getAllRubroCoordenada"], getAllRubro);
}

export function useFetchGetAllgetDepartamento() {
  return useQuery(["getAllDepartamentoCoordenada"], getAllDepartamento);
}

export function useCreateCoordenadaRubro() {
  //const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllRubroCoordenada"] }),
  });
}

export function useUpdateRubroCoordenada() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllRubroCoordenada"] }),
  });
}