import { ModelApiBackendrol, ModelApiFrontendrol } from "@/shared/zustand/slice/frmCatRol";

export const AdapterGetAllrol = (
  obj: ModelApiBackendrol
): ModelApiFrontendrol => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_rol,
      Nombre: fila.nombre_rol,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
