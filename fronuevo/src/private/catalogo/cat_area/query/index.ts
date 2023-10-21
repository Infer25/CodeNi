import { queryClient } from "@/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Servicescatarea } from "../services";


const { getAll, create, update } = Servicescatarea;

export function useFetchGetAllarea(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllarea", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreatearea() {
  return useMutation({
    mutationFn: create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllarea"] }),
  });
}

export function useUpdatearea() {
  return useMutation({
    mutationFn: update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllarea"] }),
  });
}
