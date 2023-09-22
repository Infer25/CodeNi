export interface Cat_Temporada {
  num_temporada: number;
    nombre: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  }
  
  export interface Cat_Temporada_Paginado {
    count: number;
    rows: Cat_Temporada[];
  }
  