import { ModelApiBackendarea, ModelApiFrontendarea } from "@/shared/zustand/slice/frmCatArea";

export const AdapterGetAllarea = (
  obj: ModelApiBackendarea
): ModelApiFrontendarea => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_area,
      Nombre: fila.nombre_area,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
