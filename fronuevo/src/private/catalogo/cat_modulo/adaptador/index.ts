import { ModelApiBackendmodulo, ModelApiFrontendmodulo } from "@/shared/zustand/slice/frmModulo";

export const AdapterGetAllmodulo = (
  obj: ModelApiBackendmodulo
): ModelApiFrontendmodulo => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_modulo,
      Nombre: fila.nombre_modulo,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
