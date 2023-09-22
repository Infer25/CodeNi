export interface Cat_Color {
    num_color: number;
    nombre: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  }
  
  export interface Cat_color_Paginado {
    count: number;
    rows: Cat_Color[];
  }
  