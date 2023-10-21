/*
export type ModelBackendrol = {
    num_rol: string;
    nombre: string;
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
  
  */


  export type ModelGetModulo = {
    num_modulo: string;
    nombre_modulo: string;
  };
  
  export type ModelMapGetModulo = {
    rows: ModelGetModulo[];
  };
  
//crear

export interface ModelFrmrol_modulo_Formulario {
  num_rol: number;
  list_modulo:  string;
}
