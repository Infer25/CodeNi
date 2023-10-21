import {
  ModelGetpermiso,
  ModelMapGetpermiso,
} from "@/shared/zustand/slice/frm_rol_permiso";

export const AdapterGetOnlypermiso= (obj: ModelGetpermiso[]): ModelMapGetpermiso => {
  return {
    rows: obj.map((fila) => ({
      num_permiso: fila.num_permiso,
      nombre_permiso: fila.nombre_permiso,
    })),
  };
};
