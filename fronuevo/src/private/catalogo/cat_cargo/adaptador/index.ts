import {
  ModelApiBackendcargo,
  ModelApiFrontendcargo,
  ModelGetArea,
  ModelMapGetArea,
} from "@/shared/zustand/slice/frmCatCargo";

export const AdapterGetAllcargo = (
  obj: ModelApiBackendcargo
): ModelApiFrontendcargo => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_cargo,
      num_area:fila.num_area,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
      area:fila.area
    })),
  };
};


export const AdapterGetAllArea = (
  obj: ModelGetArea[]
): ModelMapGetArea => {
  return {
    rows: obj.map((fila) => ({
      num_area: fila.num_area,
      nombre_area: fila.nombre_area,
    })),
  };
};