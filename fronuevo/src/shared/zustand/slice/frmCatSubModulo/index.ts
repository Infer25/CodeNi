export type ModelBackendsub_modulo = {
  num_sub_modulo: string;
  nombre_sub_modulo: string;
  num_modulo: string;
  ruta: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  modulo:{
    nombre_modulo:string;
  }
};

export type ModelApiBackendsub_modulo = {
  count: number;
  rows: ModelBackendsub_modulo[];
};

export type ModelFrontedsub_modulo = {
  id: string;
  num_modulo: string;
  Nombre: string;
  ruta: string;
  Descripciòn: string;
  RegistradoPor: string;
  FechaCreacion: string;
  ActualizadoPor: string;
  FechaActualizacion: string;
  modulo:{
    nombre_modulo:string;
  }
};

export type ModelApiFrontendsub_modulo = {
  count: number;
  rows: ModelFrontedsub_modulo[];
};

//
export type ModelGetmodulo = {
  num_modulo: string;
  nombre_modulo: string;
};

export type ModelMapGetmodulo = {
  rows: ModelGetmodulo[];
};





//crear
export interface ModelFrmsub_moduloFormulario {
  num_sub_modulo: number;
  num_modulo: number;
  ruta: string;
  nombre: string;
  descripcion: string;
}
