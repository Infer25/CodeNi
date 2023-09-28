import { Cat_Tipo_Identificacion, Cat_Tipo_Identificacion_Paginado } from "./entidad_cat_tipo_identificacion";


export interface Repo_Cat_Tipo_Identificacion {

  registrar: (objecto: Cat_Tipo_Identificacion) => Promise<Cat_Tipo_Identificacion>;

  actualizar: (objecto: Cat_Tipo_Identificacion, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_Tipo_Identificacion | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_Tipo_Identificacion | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_Tipo_Identificacion | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_Tipo_Identificacion[] | Cat_Tipo_Identificacion_Paginado>;
}
