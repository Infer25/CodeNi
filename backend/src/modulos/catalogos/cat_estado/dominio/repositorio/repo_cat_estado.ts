import { State, StatePaginado } from '../entidad/cat_estado';

export interface Repo_cat_estado {
  registrar: (estado: State) => Promise<State>;

  actualizar: (state: State,numestado:number) => Promise<number>;

 // cambiarEstado: (id: number) => Promise<number>;

  buscarEstadoPorId: (numestado: number) => Promise<State | null>;

  buscarEstadoPorNombre: (nombre: string) => Promise<State | null >;
 
  validarActualizacion: (nombre: string) => Promise<State | null >;
 
  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<State[] | StatePaginado>;
}
