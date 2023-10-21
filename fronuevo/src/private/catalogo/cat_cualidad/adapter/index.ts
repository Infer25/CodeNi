import { ModelApiBackendCualidad, ModelApiFrontendCualidad } from "@/shared/zustand/slice/frmCualidad";

export const AdapterGetAllCualidad = (
  obj: ModelApiBackendCualidad
): ModelApiFrontendCualidad => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_cualidad,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};


