import { ModelApiBackendTemporada, ModelApiFrontendTemporada } from "@/shared/zustand/slice/frmTemporada";

export const AdapterGetAllTemporada = (
  obj: ModelApiBackendTemporada
): ModelApiFrontendTemporada => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_temporada,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};


