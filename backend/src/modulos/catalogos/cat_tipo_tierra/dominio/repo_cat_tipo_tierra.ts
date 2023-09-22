import { Cat_Tipo_Tierra, Cat_Tipo_Tierra_Paginado } from "./entidad_cat_tipo_tierra";


export interface Repo_Cat_Tipo_Tierra {

  registrar: (objecto: Cat_Tipo_Tierra) => Promise<Cat_Tipo_Tierra>;

  actualizar: (objecto: Cat_Tipo_Tierra, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_Tipo_Tierra | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_Tipo_Tierra | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_Tipo_Tierra | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_Tipo_Tierra[] | Cat_Tipo_Tierra_Paginado>;
}
