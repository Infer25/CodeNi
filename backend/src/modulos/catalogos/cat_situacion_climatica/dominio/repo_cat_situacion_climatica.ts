import { Cat_Situacion_Climatica, Cat_Situacion_Climatica_Paginado } from "./entidad_cat_situacion_climatica";

export interface Repo_cat_situacion_climatica {

  registrar: (objecto: Cat_Situacion_Climatica) => Promise<Cat_Situacion_Climatica>;

  actualizar: (objecto: Cat_Situacion_Climatica, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_Situacion_Climatica | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_Situacion_Climatica | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_Situacion_Climatica | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_Situacion_Climatica[] | Cat_Situacion_Climatica_Paginado>;
}
