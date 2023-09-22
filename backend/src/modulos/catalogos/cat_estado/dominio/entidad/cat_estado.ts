export interface State {
  num_estado: number;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
}

export interface StatePaginado {
  count: number;
  rows: State[];
}
