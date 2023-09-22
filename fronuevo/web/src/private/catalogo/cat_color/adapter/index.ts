import { ModelApiBackendColor, ModelApiFrontendColor } from "@/shared/zustand/slice/frmColor";

export const AdapterGetAllColor = (
  obj: ModelApiBackendColor
): ModelApiFrontendColor => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_color,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};


