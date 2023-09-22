import { ModelApiFrontendGetComboBox, ModelBackendGetComboBox } from "@/shared/models";
import { ModelApiBackendRubro, ModelApiFrontendRubro } from "@/shared/zustand/slice/frmRubro";

export const AdapterGetAllRubro = (
  obj: ModelApiBackendRubro
): ModelApiFrontendRubro => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_rubro,
      idTipoRubro: fila.num_tipo_rubro,
      Nombre: fila.nombre,
      Descripciòn: fila.descripcion,
      Registrado: fila.registrado_por,
      Creacion: fila.fecha_registro,
      Actualizado: fila.actualizado_por,
      Actualizacion: fila.ultima_fecha_actualizacion,
      TipoRubro:fila.TipoRubro
    })),
  };
};

export const AdapterGetAllTipoRubro = (
  obj: ModelBackendGetComboBox[]
): ModelApiFrontendGetComboBox => {
  return {
    rows: obj.map((fila) => ({
      id: fila.identificador,
      nombre: fila.nombre,
    })),
  };
};
