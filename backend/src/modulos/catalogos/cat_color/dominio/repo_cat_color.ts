import { Cat_Color, Cat_color_Paginado } from "./entidad_cat_color";

export interface Repo_cat_color {

  registrar: (objecto: Cat_Color) => Promise<Cat_Color>;

  actualizar: (objecto: Cat_Color, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_Color | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_Color | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_Color | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_Color[] | Cat_color_Paginado>;
}
