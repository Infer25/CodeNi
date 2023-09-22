export interface Cat_rubro {
  num_rubro: number;
  num_tipo_rubro: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
}



export interface Cat_rubro_Paginado {
  count: number;
  rows: Cat_rubro[];
}

export interface TipoRubro {
  identificador: number;
  nombre: string;
}
