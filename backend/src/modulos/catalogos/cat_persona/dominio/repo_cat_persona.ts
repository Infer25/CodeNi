'./entidad_cat_persona';

import {
  Cat_Persona,
  Cat_Persona_Paginado,
  Municipio,
  Tipo_identificacion,
  tbl_persona_identificacion,
  tbl_persona_identificacionPaginar
} from './entidad_cat_persona';

export interface Repo_Cat_Persona {
  registrar: (
    objecto: Cat_Persona
  ) => Promise<Cat_Persona>;

  //actualizar: (objecto: Cat_Persona, id: number) => Promise<number>;

  //buscarPorId: (id: number) => Promise<Cat_Persona | null>;

  buscarRazonSocial: (nombre: string) => Promise<Cat_Persona | null>;

  buscarNumeroTelefonico: (nombre: string) => Promise<Cat_Persona | null>;

  buscarCorreo: (nombre: string) => Promise<Cat_Persona | null>;
  
  buscarIdentificaccion: (
    identificador: string
  ) => Promise<tbl_persona_identificacion | null>;

 // validarActualizacion: (nombre: string) => Promise<Cat_Persona | null>;

  obtenerMunicipio: () => Promise<Municipio[] | null>;

  obtenerTipoIdentificacion: () => Promise<Tipo_identificacion[] | null>;

  obtenerTodo: (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) => Promise<Cat_Persona[] | Cat_Persona_Paginado > ;
}
