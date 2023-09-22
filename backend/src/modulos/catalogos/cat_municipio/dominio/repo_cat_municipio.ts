import { Cat_Municipio_Paginado, Departamento } from './entidad_cat_municipio';
import { Cat_municipio } from './entidad_cat_municipio';

export interface Repo_cat_municipio {
  registrar: (objecto: Cat_municipio) => Promise<Cat_municipio>;

  actualizar: (objecto: Cat_municipio, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_municipio | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_municipio | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_municipio | null>;

  obtenerDepartamentoRegion: () => Promise<Departamento[] | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_municipio[] | Cat_Municipio_Paginado>;
}
