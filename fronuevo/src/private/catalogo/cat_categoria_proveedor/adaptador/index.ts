import { ModelApiBackendcategoria_proveedor, ModelApiFrontendcategoria_proveedor } from "@/shared/zustand/slice/frmCatCategoriaProveedor";

export const AdapterGetAllcategoria_proveedor = (
  obj: ModelApiBackendcategoria_proveedor
): ModelApiFrontendcategoria_proveedor => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      id: fila.num_categoria_proveedor,
      Nombre: fila.nombre_categoria_proveedor,
      Descripciòn: fila.descripcion,
      RegistradoPor: fila.registrado_por,
      FechaCreacion: fila.fecha_registro,
      ActualizadoPor: fila.actualizado_por,
      FechaActualizacion: fila.ultima_fecha_actualizacion,
    })),
  };
};
