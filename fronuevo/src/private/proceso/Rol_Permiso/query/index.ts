import { useMutation, useQuery } from "@tanstack/react-query";
import { Services_tbl_rol_permiso } from "../services";

const { create, getAllpermiso } = Services_tbl_rol_permiso;

export function useCreate_tbl_rol_permiso() {
  return useMutation({
    mutationFn: create,
    /* onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllPersona"] }),*/
  });
}

export function useFetchGetAllOnlypermiso() {
  return useQuery(["getAllpermiso"], getAllpermiso);
}
