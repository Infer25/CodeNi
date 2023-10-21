

export type ModelBackendmodulo = {
    num_modulo: string;
    nombre_modulo: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  };
  
  export type ModelApiBackendmodulo = {
    count: number;
    rows: ModelBackendmodulo[];
  };
  
  export type ModelFrontedmodulo = {
    id: string;
    Nombre: string;
    Descripciòn: string;
    RegistradoPor: string;
    FechaCreacion: string;
    ActualizadoPor: string;
    FechaActualizacion: string;
  };
  
  export type ModelApiFrontendmodulo = {
    count: number;
    rows: ModelFrontedmodulo[];
  };
  
  
  //crear
  export interface ModelFrmmoduloFormulario  {
      num_modulo: number;
      nombre: string;
      descripcion: string;
    }
    