export interface Cat_dpto_region {
  num_departamento_region: number;
  num_region_pais: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
}

export interface Cat_dpto_region_Paginado {
  count: number;
  rows: Cat_dpto_region[];
}

export interface RegionPais {
  identificador: number;
  nombre: string;
}
