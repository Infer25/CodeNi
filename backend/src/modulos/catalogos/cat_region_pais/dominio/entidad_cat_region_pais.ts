export interface Cat_region_pais {
    num_region_pais: number;
    nombre: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  }
  
  export interface Cat_region_pais_Paginado {
    count: number;
    rows: Cat_region_pais[];
  }
  