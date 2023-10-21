import {
  ModelGetModulo,
  ModelMapGetModulo,
} from "@/shared/zustand/slice/frm_rol_modulo";

export const AdapterGetOnlyModulo= (obj: ModelGetModulo[]): ModelMapGetModulo => {
  return {
    rows: obj.map((fila) => ({
      num_modulo: fila.num_modulo,
      nombre_modulo: fila.nombre_modulo,
    })),
  };
};
