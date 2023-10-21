import { ModelApiBackendclasificacion_empresa, ModelApiFrontendclasificacion_empresa } from "@/shared/zustand/slice/frmCatClasificacionEmpresa";

export const AdapterGetAllclasificacion_empresa  = (
  obj: ModelApiBackendclasificacion_empresa 
): ModelApiFrontendclasificacion_empresa  => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_clasificacion_empresa ,
      Nombre: fila.nombre_clasificacion_empresa ,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
