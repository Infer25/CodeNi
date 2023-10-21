
  export type ModelGetpermiso = {
    num_permiso: string;
    nombre_permiso: string;
  };
  
  export type ModelMapGetpermiso = {
    rows: ModelGetpermiso[];
  };
  
//crear

export interface ModelFrmrol_permiso_Formulario {
  num_rol: number;
  list_permiso:  string;
}
