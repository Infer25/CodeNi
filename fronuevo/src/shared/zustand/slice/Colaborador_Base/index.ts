export type ModelTipoIdentificacionPersonaBase = {
    identificacion: string;
  };
  

export type ModelIdentificacionBase = {
    nombre: string;
    pivote: ModelTipoIdentificacionPersonaBase;
  };
  
  export interface colaborador_personaBase {
    num_colaborador: number;
  }


export interface ModelBackendEmpleadoBase {
    nombre: string;
    apellido_razonsocial: string;
    identificacion: ModelIdentificacionBase[];
    colaborador_persona: colaborador_personaBase;
  }
  
  export type ModelApiBackendEmpleadoBase = {
    count: number;
    rows: ModelBackendEmpleadoBase[];
  };
  
  export type ModelFrontedEmpleadoBase = {
    nombre: string;
    apellido_razonsocial: string;
    identificacion: ModelIdentificacionBase[];
    colaborador_persona: colaborador_personaBase;
  };
  export type ModelApiFrontendEmpleadoBase = {
    count?: number;
    rows: ModelFrontedEmpleadoBase[];
  };

  export interface Cat_Base {
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  }
  