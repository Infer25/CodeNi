import { ModelApiBackendTipoIdentificacion, ModelApiFrontendTipoIdentificacion } from "@/shared/zustand/slice/frmTipoIdentificacion";

export const AdapterGetAllTipoIdentificacion = (
  obj: ModelApiBackendTipoIdentificacion
): ModelApiFrontendTipoIdentificacion => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_tipo_identificacion,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};


