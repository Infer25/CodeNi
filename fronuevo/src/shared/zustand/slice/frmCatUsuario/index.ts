

export interface Cat_usuario  {
    num_colaborador: string;
    nombre_colaborador?: string;
    usuario: string;
    pass: string;
    list_rol: string;
  }
  

  export type ModelGetRol = {
    num_rol: string;
    nombre_rol: string;
  };
  
  export type ModelMapGetRol = {
    rows: ModelGetRol[];
  };
  