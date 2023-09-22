export interface Cat_Tipo_Tierra {
  num_tipo_tierra: number;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
}

export interface Cat_Tipo_Tierra_Paginado {
  count: number;
  rows: Cat_Tipo_Tierra[];
}
