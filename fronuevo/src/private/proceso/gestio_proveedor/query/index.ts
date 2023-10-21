import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicesProveedor } from "../services";

const {
  getAll,
  getAllTipoEmpresa,
  getAllClasificacionEmpresa,
  getAllCategoriaProveedor,
  getAllFormaPago,
  create
} = ServicesProveedor;

export function useFetchGetAllPersonaProveedor(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  return useQuery(
    ["getAllPersonaProveedor", criterio, filtro, pagina, cantidadFila],
    () => getAll(criterio, filtro, pagina, cantidadFila)
  );
}
export function useFetchGetAllTipoEmpresa() {
  return useQuery(["getAllOnlyTipoEmpresa"], getAllTipoEmpresa);
}
export function useFetchGetAllClasificacionEmpresa() {
  return useQuery(
    ["getAllOnlyClasificacionEmpresa"],
    getAllClasificacionEmpresa
  );
}
export function useFetchGetAllCategoriaProveedor() {
  return useQuery(["getAllOnlyCategoria"], getAllCategoriaProveedor);
}

export function useFetchGetAllFormaPago() {
  return useQuery(["getAllOnlyFormaPago"], getAllFormaPago);
}

export function useCreateProveedor() {
  return useMutation({
    mutationFn: create});
}
