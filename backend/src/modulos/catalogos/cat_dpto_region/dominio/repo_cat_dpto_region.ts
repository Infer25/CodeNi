import {
  Cat_dpto_region,
  Cat_dpto_region_Paginado,
  RegionPais
} from './entidad_cat_dpto_region';

export interface Repo_cat_dpto_region {
  registrar: (objecto: Cat_dpto_region) => Promise<Cat_dpto_region>;

  actualizar: (objecto: Cat_dpto_region, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_dpto_region | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_dpto_region | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_dpto_region | null>;

  obtenerRegionPais: () => Promise<RegionPais[] | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_dpto_region[] | Cat_dpto_region_Paginado>;
}
