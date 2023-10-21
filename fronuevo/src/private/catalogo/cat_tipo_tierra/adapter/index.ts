import { ModelApiBackendTipoTierra, ModelApiFrontendTipoTierra } from "@/shared/zustand/slice/frmTipoTierra";


export const AdapterGetAllTipoTierra = (
  obj: ModelApiBackendTipoTierra
): ModelApiFrontendTipoTierra => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_tipo_tierra,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};


