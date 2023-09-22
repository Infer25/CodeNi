import {
  ModelApiBackendDptoRegion,
  ModelApiFrontendDptoRegion,
  ModelApiFrontendGetRegion,
  ModelBackendGetRegion
} from "@/shared/zustand/slice/frmDptoRegion";

export const AdapterGetAllDptoRegion = (
  obj: ModelApiBackendDptoRegion
): ModelApiFrontendDptoRegion => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_departamento_region,
      region: fila.num_region_pais,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
      Region:fila.Region
    })),
  };
};

export const AdapterGetAllRegionPais = (
  obj: ModelBackendGetRegion[]
): ModelApiFrontendGetRegion => {
  return {
    rows: obj.map((fila) => ({
      id: fila.identificador,
      nombre: fila.nombre,
    })),
  };
};
