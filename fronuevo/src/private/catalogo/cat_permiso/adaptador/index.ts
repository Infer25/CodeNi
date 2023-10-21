import { ModelApiBackendpermiso, ModelApiFrontendpermiso } from "@/shared/zustand/slice/frmCatPermiso";

export const AdapterGetAllpermiso = (
  obj: ModelApiBackendpermiso
): ModelApiFrontendpermiso => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_permiso,
      Nombre: fila.nombre_permiso,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
