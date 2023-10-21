import {
  ModelMapGetTbl_rubro_coordenada_Backend_Backend,
  ModelMapGetTbl_rubro_coordenada_Backend_Frontend,
} from "@/shared/zustand/slice/Rubro_Coordenada";

export const AdapterGetRubroCoordenada = (
  obj: ModelMapGetTbl_rubro_coordenada_Backend_Backend
): ModelMapGetTbl_rubro_coordenada_Backend_Frontend => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      num_rubro_coordenada: fila.num_rubro_coordenada,
      num_departamento_region: fila.num_departamento_region,
      num_rubro: fila.num_rubro,
      coordenada: fila.coordenada,
      registrado_por: fila.registrado_por,
      fecha_registro: fila.fecha_registro,
      actualizado_por: fila.actualizado_por,
      ultima_fecha_actualizacion: fila.ultima_fecha_actualizacion,
      ModelRubro: fila.ModelRubro,
      ModelDepartamento: fila.ModelDepartamento,
    })),
  };
};
