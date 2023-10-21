

export type ModelBackendrol = {
    num_rol: string;
    nombre_rol: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  };
  
  export type ModelApiBackendrol = {
    count: number;
    rows: ModelBackendrol[];
  };
  
  export type ModelFrontedrol = {
    id: string;
    Nombre: string;
    Descripciòn: string;
    RegistradoPor: string;
    FechaCreacion: string;
    ActualizadoPor: string;
    FechaActualizacion: string;
  };
  
  export type ModelApiFrontendrol = {
    count: number;
    rows: ModelFrontedrol[];
  };
  
  
  //crear
  export interface ModelFrmrolFormulario  {
      num_rol: number;
      nombre: string;
      descripcion: string;
    }
    