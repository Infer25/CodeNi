import { ModelBackendGetRegion } from "@/shared/zustand/slice/frmDptoRegion";
import {
  ModelApiBackendPersonaModelApiBackendPersona,
  ModelApiFrontendGetMunicipio,
  ModelApiFrontendPersonaModelApiBackendPersona,
} from "@/shared/zustand/slice/proceso/gestion_colaborador";

export const AdapterGetAllPersona = (
  obj: ModelApiBackendPersonaModelApiBackendPersona
): ModelApiFrontendPersonaModelApiBackendPersona => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      num_persona: fila.num_persona,
      fechanac_fechaconstitucion: fila.fechanac_fechaconstitucion,
      origen: fila.origen,
      nombre: fila.nombre,
      apellido_razonsocial: fila.apellido_razonsocial,
      movil: fila.movil,
      email: fila.email,
      direccion: fila.direccion,
      registrado_por: fila.registrado_por,
      fecha_registro: fila.fecha_registro,
      actualizado_por: fila.actualizado_por,
      ultima_fecha_actualizacion: fila.ultima_fecha_actualizacion,
      municipio: {
        nombre: fila.municipio.nombre,
      },

      identificacion: fila.identificacion.map((y) => ({
        nombre: y.nombre,

        pivote: {
          identificacion: y.pivote.identificacion,
        },
      })),
    })),
  };
};

export const AdapterGetAllCbx = (
  obj: ModelBackendGetRegion[]
): ModelApiFrontendGetMunicipio => {
  return {
    rows: obj.map((fila) => ({
      id: fila.identificador,
      nombre: fila.nombre,
    })),
  };
};


export const AdapterGetAllCbxTipoColaborador = (
  obj: ModelBackendGetRegion[]
): ModelApiFrontendGetMunicipio => {
  return {
    rows: obj.map((fila) => ({
      id: fila.identificador,
      nombre: fila.nombre,
    })),
  };
};
