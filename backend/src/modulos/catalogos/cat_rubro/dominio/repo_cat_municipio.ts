import { Cat_rubro, Cat_rubro_Paginado, TipoRubro } from "./entidad_cat_rubro";

export interface Repo_cat_rubro {
  registrar: (objecto: Cat_rubro) => Promise<Cat_rubro>;

  actualizar: (objecto: Cat_rubro, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_rubro | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_rubro | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_rubro | null>;

  obtenerTipoRubro: () => Promise<TipoRubro[] | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_rubro[] | Cat_rubro_Paginado>;
}
