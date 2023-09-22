import { Cat_Temporada, Cat_Temporada_Paginado } from "./entidad_cat_temporada";


export interface Repo_Cat_Temporada {

  registrar: (objecto: Cat_Temporada) => Promise<Cat_Temporada>;

  actualizar: (objecto: Cat_Temporada, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_Temporada | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_Temporada | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_Temporada | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_Temporada[] | Cat_Temporada_Paginado>;
}
