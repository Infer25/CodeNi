

export type ModelBackendclasificacion_empresa = {
    num_clasificacion_empresa: string;
    nombre_clasificacion_empresa: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  };
  
  export type ModelApiBackendclasificacion_empresa = {
    count: number;
    rows: ModelBackendclasificacion_empresa[];
  };
  
  export type ModelFrontedclasificacion_empresa = {
    id: string;
    Nombre: string;
    Descripciòn: string;
    RegistradoPor: string;
    FechaCreacion: string;
    ActualizadoPor: string;
    FechaActualizacion: string;
  };
  
  export type ModelApiFrontendclasificacion_empresa = {
    count: number;
    rows: ModelFrontedclasificacion_empresa[];
  };
  
  
  //crear
  export interface ModelFrmclasificacion_empresaFormulario  {
      num_clasificacion_empresa: number;
      nombre: string;
      descripcion: string;
    }
    