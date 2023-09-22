import {
  Cat_region_pais,
  Cat_region_pais_Paginado
} from './entidad_cat_region_pais';

export interface Repo_cat_region_pais {

  registrar: (objecto: Cat_region_pais) => Promise<Cat_region_pais>;

  actualizar: (objecto: Cat_region_pais, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_region_pais | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_region_pais | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_region_pais | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_region_pais[] | Cat_region_pais_Paginado>;
}
