

export type ModelBackendpermiso = {
    num_permiso: string;
    nombre_permiso: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  };
  
  export type ModelApiBackendpermiso = {
    count: number;
    rows: ModelBackendpermiso[];
  };
  
  export type ModelFrontedpermiso = {
    id: string;
    Nombre: string;
    Descripciòn: string;
    RegistradoPor: string;
    FechaCreacion: string;
    ActualizadoPor: string;
    FechaActualizacion: string;
  };
  
  export type ModelApiFrontendpermiso = {
    count: number;
    rows: ModelFrontedpermiso[];
  };
  
  
  //crear
  export interface ModelFrmpermisoFormulario  {
      num_permiso: number;
      nombre: string;
      descripcion: string;
    }
    