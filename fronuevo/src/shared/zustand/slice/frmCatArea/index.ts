

export type ModelBackendarea = {
    num_area: string;
    nombre_area: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  };
  
  export type ModelApiBackendarea = {
    count: number;
    rows: ModelBackendarea[];
  };
  
  export type ModelFrontedarea = {
    id: string;
    Nombre: string;
    Descripciòn: string;
    RegistradoPor: string;
    FechaCreacion: string;
    ActualizadoPor: string;
    FechaActualizacion: string;
  };
  
  export type ModelApiFrontendarea = {
    count: number;
    rows: ModelFrontedarea[];
  };
  
  
  //crear
  export interface ModelFrmareaFormulario  {
      num_area: number;
      nombre: string;
      descripcion: string;
    }
    