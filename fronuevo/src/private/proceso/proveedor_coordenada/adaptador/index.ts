import {
  ModelApiBackendProveedorCoordenadaBackend,
  ModelApiFrontendProveedorCoordenadaFrontend,
} from "@/shared/zustand/slice/proveedor_ubicacion";

export const AdapterGetProveedorCoordenada = (
  obj: ModelApiBackendProveedorCoordenadaBackend
): ModelApiFrontendProveedorCoordenadaFrontend => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({
      num_proveedor: fila.num_proveedor,
      Persona_Proveedor: fila.Persona_Proveedor,
      Model_cattipo_empresa: fila.Model_cattipo_empresa,
      Model_cat_clasificacion_empresa: fila.Model_cat_clasificacion_empresa,
    })),
  };
};
