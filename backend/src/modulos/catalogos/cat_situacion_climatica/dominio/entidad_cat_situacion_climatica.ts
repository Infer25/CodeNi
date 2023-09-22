export interface Cat_Situacion_Climatica {
  num_situacion_climatica: number;
    nombre: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  }
  
  export interface Cat_Situacion_Climatica_Paginado {
    count: number;
    rows: Cat_Situacion_Climatica[];
  }
  