
import { ModelApiBackendtipo_empresa, ModelApiFrontendtipo_empresa } from "@/shared/zustand/slice/frmCatTipoEmpresa";

export const AdapterGetAlltipo_empresa = (
  obj: ModelApiBackendtipo_empresa
): ModelApiFrontendtipo_empresa => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_tipo_empresa,
      Nombre: fila.nombre_tipo_empresa,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
