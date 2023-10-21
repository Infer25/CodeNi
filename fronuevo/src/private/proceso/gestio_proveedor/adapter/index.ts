import { ModelApiBackendProveedorListPersona, ModelApiFrontendProveedorListPersona } from "@/shared/zustand/slice/proceso/frm_proveedor";

export const AdapterGetAllProveedor= (
  obj: ModelApiBackendProveedorListPersona
): ModelApiFrontendProveedorListPersona => {
  return {
    count: obj.count,
    rows: obj.rows.map((fila) => ({

      nombre_completo:fila.nombre_completo,
      num_persona:fila.num_persona,
      identificacion:fila.identificacion


    }))
  };
};
