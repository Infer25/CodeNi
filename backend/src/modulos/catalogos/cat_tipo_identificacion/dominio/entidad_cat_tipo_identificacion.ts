export interface Cat_Tipo_Identificacion {
  num_tipo_identificacion: number;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
}

export interface Cat_Tipo_Identificacion_Paginado {
  count: number;
  rows: Cat_Tipo_Identificacion[];
}
