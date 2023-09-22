export interface Cat_municipio {
  num_municipio: number;
  num_departamento_region: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
}

export interface Cat_Municipio_Paginado {
  count: number;
  rows: Cat_municipio[];
}

export interface Departamento {
  identificador: number;
  nombre: string;
}
