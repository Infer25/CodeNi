export type ModelTipoIdentificacionPersona = {
  identificacion: string;
};

export type ModelIdentificacion = {
  nombre: string;
  pivote: ModelTipoIdentificacionPersona;
};

export interface colaborador_persona {
  num_colaborador: number;
}

export interface ModelBackendCargoEmpleado {
  nombre: string;
  apellido_razonsocial: string;
  identificacion: ModelIdentificacion[];
  colaborador_persona: colaborador_persona;
}

export type ModelApiBackendCargoEmpleado = {
  count: number;
  rows: ModelBackendCargoEmpleado[];
};

export type ModelFrontedCargoEmpleado = {
  nombre: string;
  apellido_razonsocial: string;
  identificacion: ModelIdentificacion[];
  colaborador_persona: colaborador_persona;
};

export type ModelApiFrontendCargoEmpleado = {
  count?: number;
  rows: ModelFrontedCargoEmpleado[];
};

export type ModelGetArea = {
  num_area: string;
  nombre_area: string;
};

export type ModelMapGetArea = {
  rows: ModelGetArea[];
};


///cargo filtrado por area
export type ModelGetCargoFiltroArea = {
  num_cargo: string;
  nombre: string;
};

export type ModelMapGetCargoArea = {
  rows: ModelGetCargoFiltroArea[];
};
//crear
export interface ModelFrmHistorialCargoFormulario {
  num_colaborador: string;
  num_area: string;
  num_cargo: string;
  cedula:string;
  nombre:string;
  descripcion:string;
  registrado_por: string;
}
