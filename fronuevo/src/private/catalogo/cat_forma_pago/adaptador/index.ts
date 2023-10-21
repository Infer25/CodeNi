import { ModelApiBackendforma_pago, ModelApiFrontendforma_pago } from "@/shared/zustand/slice/frmCatFormaPago";

export const AdapterGetAllforma_pago  = (
  obj: ModelApiBackendforma_pago 
): ModelApiFrontendforma_pago  => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_forma_pago ,
      Nombre: fila.nombre_forma_pago ,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
