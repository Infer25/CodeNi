export type ModelTipoIdentificacionPersonaFrontend = {
  identificacion: string;
};

export type ModelIdentificacionFrontend = {
  nombre: string;
  pivote: ModelTipoIdentificacionPersonaFrontend;
};

export interface ModelBackendProveedorListPersona {
  num_persona: string;
  nombre_completo: string;
  identificacion: ModelIdentificacionFrontend[]
}
export type ModelApiBackendProveedorListPersona = {
  count: number;
  rows: ModelBackendProveedorListPersona[];
};

export interface ModelFrontendProveedorListPersona {
  num_persona: string;
  nombre_completo: string;
  identificacion: ModelIdentificacionFrontend[]
}
export type ModelApiFrontendProveedorListPersona = {
  count: number;
  rows: ModelBackendProveedorListPersona[];
};
///crear
export interface CrearProveedor {
  num_persona:string;
  num_tipo_empresa:string;
  num_clasificacion_empresa:string;
  cantidad_dias_espera:string;
  nombre?: string;
  identificacion?: string;
  list_forma_pago:string;
  list_categoria_proveedor:string;
}
//TipoEmpresacbx
export interface TipoEmpresa {
  num_tipo_empresa: number;
  nombre_tipo_empresa: string;
}

//ClasificacionEmpresacbx
export interface ClasificacionEmpresa {
  num_clasificacion_empresa: number;
  nombre_clasificacion_empresa: string;
}
//CategoriaTable
export interface CategoriaProveedor{
  num_categoria_proveedor: number;
  nombre_categoria_proveedor: string;
}

//TableFormaPago
export interface FormaPago{
  num_forma_pago: number;
  nombre_forma_pago: string;
}