import {
  ModelBackendEstado_,
  ModelFronteddEstado_,
} from "@/shared/zustand/slice/frmEstado";

export const AdapterGetAll = (
  estado: ModelBackendEstado_
): ModelFronteddEstado_ => {
  return {
    count: estado.count,
    rows: estado.rows.map((fila) => ({
      id: fila.num_estado,
      Estado: fila.nombre,
      Descripciòn: fila.descripcion,
      ["registrado por"]: fila.registrado_por,
      ["Fecha de registro"]: fila.fecha_registro,
      actualizadopor: fila.actualizado_por,
      ultimafechaactualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
