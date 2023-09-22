import {
  ModelBackendGetRegion
} from "@/shared/zustand/slice/frmDptoRegion";
import { ModelApiBackendMunicipio, ModelApiFrontendGetDepartamento, ModelApiFrontendMunicipio } from "@/shared/zustand/slice/frmMunicipio";

export const AdapterGetAllMunicipio = (
  obj: ModelApiBackendMunicipio
): ModelApiFrontendMunicipio => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_municipio,
      idDepartamento: fila.num_departamento_region,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
      Departamento:fila.Departamento
    })),
  };
};

export const AdapterGetAllDepartamento = (
  obj: ModelBackendGetRegion[]
): ModelApiFrontendGetDepartamento => {
  return {
    rows: obj.map((fila) => ({
      id: fila.identificador,
      nombre: fila.nombre,
    })),
  };
};
