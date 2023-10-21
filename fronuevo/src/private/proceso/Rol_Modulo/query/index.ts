import { useMutation, useQuery } from "@tanstack/react-query";
import { Services_tbl_rol_modulo } from "../services";

const { create, getAllModulo } = Services_tbl_rol_modulo;

export function useCreate_tbl_rol_modulo() {
  return useMutation({
    mutationFn: create,
    /* onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllPersona"] }),*/
  });
}

export function useFetchGetAllOnlyModulo() {
  return useQuery(["getAllModulo"], getAllModulo);
}
