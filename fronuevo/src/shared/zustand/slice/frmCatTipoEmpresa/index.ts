

export type ModelBackendtipo_empresa = {
    num_tipo_empresa: string;
    nombre_tipo_empresa: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  };
  
  export type ModelApiBackendtipo_empresa = {
    count: number;
    rows: ModelBackendtipo_empresa[];
  };
  
  export type ModelFrontedtipo_empresa = {
    id: string;
    Nombre: string;
    Descripciòn: string;
    RegistradoPor: string;
    FechaCreacion: string;
    ActualizadoPor: string;
    FechaActualizacion: string;
  };
  
  export type ModelApiFrontendtipo_empresa = {
    count: number;
    rows: ModelFrontedtipo_empresa[];
  };
  
  
  //crear
  export interface ModelFrmtipo_empresaFormulario  {
      num_tipo_empresa: number;
      nombre: string;
      descripcion: string;
    }
    