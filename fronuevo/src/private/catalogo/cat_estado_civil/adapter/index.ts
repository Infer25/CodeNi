import { ModelApiBackendEstadoCivil, ModelApiFrontendEstadoCivil } from "@/shared/zustand/slice/frmEstadoCivil";


export const AdapterGetAllEstadoCivil = (
  obj: ModelApiBackendEstadoCivil
): ModelApiFrontendEstadoCivil => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_estado_civil,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};


