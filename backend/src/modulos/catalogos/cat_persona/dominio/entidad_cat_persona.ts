
//crear
export interface tbl_persona_identificacion {
  num_persona_identificacion: string;
  num_persona: string;
  num_tipo_identificacion: string;
  identificacion: string;
  registrado_por: number;
  fecha_registro: number;
  actualizado_por: number;
  ultima_fecha_actualizacion: number;
}

export interface Cat_Persona {
  num_persona: number;
  fechanac_fechaconstitucion: string;
  origen: string;
  nombre: string;
  apellido_razonsocial: string;
  movil: string;
  email: string;
  direccion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  identificacio: tbl_persona_identificacion[];
}

export interface Cat_Persona_Paginado {
  count: number;
  rows: Cat_Persona[];
}
//getAll
export interface Municipio {
  identificador: number;
  nombre: string;
}

export interface Tipo_identificacion {
  identificador: number;
  nombre: string;
}
///listar


export interface tbl_persona_identificacionPaginar {
  count: number;
  rows: tbl_persona_identificacion[];
}
