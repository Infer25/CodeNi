import { ModelApiBackendTipoRubro, ModelApiFrontendTipoRubro } from "@/shared/zustand/slice/frmTipoRubro";

export const AdapterGetAllTipoRubro = (
  obj: ModelApiBackendTipoRubro
): ModelApiFrontendTipoRubro => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_tipo_rubro,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};


