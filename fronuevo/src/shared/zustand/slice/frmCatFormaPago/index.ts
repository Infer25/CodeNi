

export type ModelBackendforma_pago = {
    num_forma_pago: string;
    nombre_forma_pago: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  };
  
  export type ModelApiBackendforma_pago = {
    count: number;
    rows: ModelBackendforma_pago[];
  };
  
  export type ModelFrontedforma_pago = {
    id: string;
    Nombre: string;
    Descripciòn: string;
    RegistradoPor: string;
    FechaCreacion: string;
    ActualizadoPor: string;
    FechaActualizacion: string;
  };
  
  export type ModelApiFrontendforma_pago = {
    count: number;
    rows: ModelFrontedforma_pago[];
  };
  
  
  //crear
  export interface ModelFrmforma_pagoFormulario  {
      num_forma_pago: number;
      nombre: string;
      descripcion: string;
    }
    