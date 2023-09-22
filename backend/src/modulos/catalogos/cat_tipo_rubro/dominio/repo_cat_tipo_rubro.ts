import { Tipo_Rubro, Tipo_Rubro_Paginado } from "./entidad_tipo_rubro";


export interface Repo_cat_tipo_rubro {
  registrar: (obj: Tipo_Rubro) => Promise<Tipo_Rubro>;

  actualizar: (obj: Tipo_Rubro,id:number) => Promise<number>;

  buscarPorId: (id: number) => Promise<Tipo_Rubro | null>;

  buscarPorNombre: (nombre: string) => Promise<Tipo_Rubro | null >;
 
  validarActualizacion: (nombre: string) => Promise<Tipo_Rubro | null >;
 
  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Tipo_Rubro[] | Tipo_Rubro_Paginado>;
}
