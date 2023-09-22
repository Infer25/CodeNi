import { useMutation, useQuery } from "@tanstack/react-query";
import { State } from "../services/index.js";
import { queryClient } from "@/config/index.js";

const { getAll, createState, updateState } = State;

export function useFetchGetAll(
  criterio: string,
  filtro: string,
  pagina: number,
  cantidadFila: number
) {
  /*const { pagina } = useStoreGlobal(
    (state) => ({
      pagina: state.,
    })
  );*/

  return useQuery(["getAllState", criterio, filtro, pagina, cantidadFila], () =>
    getAll(criterio, filtro, pagina, cantidadFila)
  );
}

export function useCreateState() {
  //const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createState,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllState"] }),
  });
}

export function useUpdateState() {
  return useMutation({ mutationFn: updateState,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllState"] }), });
}
