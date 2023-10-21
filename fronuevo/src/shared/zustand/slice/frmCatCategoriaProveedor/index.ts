

export type ModelBackendcategoria_proveedor = {
    num_categoria_proveedor: string;
    nombre_categoria_proveedor: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  };
  
  export type ModelApiBackendcategoria_proveedor = {
    count: number;
    rows: ModelBackendcategoria_proveedor[];
  };
  
  export type ModelFrontedcategoria_proveedor = {
    id: string;
    Nombre: string;
    Descripciòn: string;
    RegistradoPor: string;
    FechaCreacion: string;
    ActualizadoPor: string;
    FechaActualizacion: string;
  };
  
  export type ModelApiFrontendcategoria_proveedor = {
    count: number;
    rows: ModelFrontedcategoria_proveedor[];
  };
  
  
  //crear
  export interface ModelFrmcategoria_proveedorFormulario  {
      num_categoria_proveedor: number;
      nombre: string;
      descripcion: string;
    }
    