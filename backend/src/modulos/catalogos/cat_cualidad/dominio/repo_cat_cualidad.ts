import { Cat_Cualidad, Cat_Cualidad_Paginado } from "./entidad_cat_cualidad";


export interface Repo_Cat_Cualidad {

  registrar: (objecto: Cat_Cualidad) => Promise<Cat_Cualidad>;

  actualizar: (objecto: Cat_Cualidad, id: number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Cat_Cualidad | null>;

  buscarPorNombre: (nombre: string) => Promise<Cat_Cualidad | null>;

  validarActualizacion: (nombre: string) => Promise<Cat_Cualidad | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_Cualidad[] | Cat_Cualidad_Paginado>;
}
