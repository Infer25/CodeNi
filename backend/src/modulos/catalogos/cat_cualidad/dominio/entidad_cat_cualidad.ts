export interface Cat_Cualidad {
    num_cualidad: number;
    nombre: string;
    descripcion: string;
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
  }
  
  export interface Cat_Cualidad_Paginado {
    count: number;
    rows: Cat_Cualidad[];
  }
  