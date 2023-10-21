import {
  ModelApiBackendCargoEmpleado,
  ModelApiFrontendCargoEmpleado,
  ModelGetArea,
  ModelGetCargoFiltroArea,
  ModelMapGetArea,
  ModelMapGetCargoArea,
} from "@/shared/zustand/slice/proceso/gestion_colaborador/frmAsignacionCargo";

export const AdapterGetAllColaborador = (
  obj: ModelApiBackendCargoEmpleado
): ModelApiFrontendCargoEmpleado => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      nombre: fila.nombre,
      apellido_razonsocial: fila.apellido_razonsocial,
      identificacion: fila.identificacion.map((y) => ({
        nombre: y.nombre,
        pivote: {
          identificacion: y.pivote.identificacion,
        },
      })),
      colaborador_persona: fila.colaborador_persona,
    })),
  };
};

export const AdapterGetAllArea = (obj: ModelGetArea[]): ModelMapGetArea => {
  return {
    rows: obj.map((fila) => ({
      num_area: fila.num_area,
      nombre_area: fila.nombre_area,
    })),
  };
};

export const AdapterGetAllCargoArea = (
  obj: ModelGetCargoFiltroArea[]
): ModelMapGetCargoArea => {
  return {
    rows: obj.map((fila) => ({
      num_cargo: fila.num_cargo,
      nombre: fila.nombre,
    })),
  };
};
