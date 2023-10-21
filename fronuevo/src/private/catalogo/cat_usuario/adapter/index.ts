import {
  ModelApiBackendEmpleadoBase,
  ModelApiFrontendEmpleadoBase,
} from "@/shared/zustand/slice/Colaborador_Base";
import {
  ModelGetRol,
  ModelMapGetRol,
} from "@/shared/zustand/slice/frmCatUsuario";

export const AdapterGetAllColaborador = (
  obj: ModelApiBackendEmpleadoBase
): ModelApiFrontendEmpleadoBase => {
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

export const AdapterGetOnlyrol = (obj: ModelGetRol[]): ModelMapGetRol => {
  return {
    rows: obj.map((fila) => ({
      num_rol: fila.num_rol,
      nombre_rol: fila.nombre_rol,
    })),
  };
};
