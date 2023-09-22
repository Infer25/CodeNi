export interface Tipo_Rubro {
    num_tipo_rubro: number;
    nombre: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  }
  
  export interface Tipo_Rubro_Paginado {
    count: number;
    rows: Tipo_Rubro[];
  }
  