
import { ModelApiBackendSituacionClimatica, ModelApiFrontendSituacionClimatica } from "@/shared/zustand/slice/frmSituacionClimatica";

export const AdapterGetAllSituacionClimatica = (
  obj: ModelApiBackendSituacionClimatica
): ModelApiFrontendSituacionClimatica => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_situacion_climatica,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};


