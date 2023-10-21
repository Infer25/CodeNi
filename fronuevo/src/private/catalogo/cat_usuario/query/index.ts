import { useMutation, useQuery } from "@tanstack/react-query";
import { Servicescatusuario } from "../services";

const { getAllColaboradorUsuario,getAllrol,create } = Servicescatusuario;

export function useFetchGetAllColaborador(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllColaboradorUsuario", criterio, filtro, pagina, cantidadFila],
    () => getAllColaboradorUsuario(criterio, filtro, pagina, cantidadFila)
  );
}
export function useFetchGetAllOnlyrol() {
  return useQuery(["getAllrol"], getAllrol);
}

export function useCreateUsuario() {
  return useMutation({
    mutationFn: create,
    /* onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllPersona"] }),*/
  });
}
