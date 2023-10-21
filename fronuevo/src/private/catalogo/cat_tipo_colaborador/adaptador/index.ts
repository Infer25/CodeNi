import { ModelApiBackendTipocolaborador, ModelApiFrontendTipocolaborador } from "@/shared/zustand/slice/frmTipoColaborador";


export const AdapterGetAllTipocolaborador = (
  obj: ModelApiBackendTipocolaborador
): ModelApiFrontendTipocolaborador => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_tipo_colaborador,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};

