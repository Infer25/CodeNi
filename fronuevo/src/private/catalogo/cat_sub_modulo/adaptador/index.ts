import {
  ModelApiBackendsub_modulo,
  ModelApiFrontendsub_modulo,
  ModelGetmodulo,
  ModelMapGetmodulo,
} from "@/shared/zustand/slice/frmCatSubModulo";

export const AdapterGetAllsub_modulo = (
  obj: ModelApiBackendsub_modulo
): ModelApiFrontendsub_modulo => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_sub_modulo,
      num_modulo: fila.num_modulo,
      Nombre: fila.nombre_sub_modulo,
      ruta: fila.ruta,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
      modulo:fila.modulo
    })),
  };
};


export const AdapterGetOnlyModulo = (
  obj: ModelGetmodulo[]
): ModelMapGetmodulo => {
  return {
    rows: obj.map((fila) => ({
      num_modulo: fila.num_modulo,
      nombre_modulo: fila.nombre_modulo,
    })),
  };
};