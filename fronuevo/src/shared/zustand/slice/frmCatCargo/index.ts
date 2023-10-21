export type ModelBackendcargo = {
  num_cargo: string;
  num_area:string,
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  area: {
    nombre_area: string;
  };
};

export type ModelApiBackendcargo = {
  count: number;
  rows: ModelBackendcargo[];
};

export type ModelFrontedcargo = {
  id: string;
  num_area:string,
  Nombre: string;
  Descripciòn: string;
  RegistradoPor: string;
  FechaCreacion: string;
  ActualizadoPor: string;
  FechaActualizacion: string;
  area: {
    nombre_area: string;
  };
};

export type ModelApiFrontendcargo = {
  count: number;
  rows: ModelFrontedcargo[];
};

export type ModelGetArea = {
  num_area: string;
  nombre_area: string;
};

export type ModelMapGetArea = {
  rows: ModelGetArea[];
};

//crear
export interface ModelFrmcargoFormulario {
  num_area: number;
  num_cargo: number;
  descripcion: string;
  nombre: string;
}
