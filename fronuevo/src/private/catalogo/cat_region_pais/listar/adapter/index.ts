import {
  ModelApiBackendRegionPais,
  ModelApiFrontendRegionPais,
} from "@/shared/zustand/slice/frmRegionPais";

export const AdapterGetAllRegionPais = (
  estado: ModelApiBackendRegionPais
): ModelApiFrontendRegionPais => {
  return {
    count: estado.count,
    rows: estado.rows.map((fila) => ({
      id: fila.num_region_pais,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      ["Registrado"]: fila.registrado_por,
      ["Creacion"]: fila.fecha_registro,
      ["Actualizado"]: fila.actualizado_por,
      ["Actualizacion"]: fila.ultima_fecha_actualizacion,
    })),
  };
};
