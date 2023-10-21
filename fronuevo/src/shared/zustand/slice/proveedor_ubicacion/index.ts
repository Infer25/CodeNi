export interface ProveedorCoordenadaBackend {
  num_proveedor: string;
  Persona_Proveedor: {
    nombre: string;
  };
  Model_cattipo_empresa: {
    nombre_tipo_empresa: string;
  };
  Model_cat_clasificacion_empresa: {
    nombre_clasificacion_empresa: string;
  };
}

export type ModelApiBackendProveedorCoordenadaBackend = {
  count: number;
  rows: ProveedorCoordenadaBackend[];
};

export interface ProveedorCoordenadaFrontend {
  num_proveedor: string;
  Persona_Proveedor: {
    nombre: string;
  };
  Model_cattipo_empresa: {
    nombre_tipo_empresa: string;
  };
  Model_cat_clasificacion_empresa: {
    nombre_clasificacion_empresa: string;
  };
}

export type ModelApiFrontendProveedorCoordenadaFrontend = {
  count: number;
  rows: ProveedorCoordenadaFrontend[];
};

export type ModelCrearProveedorCoordenada = {
  nombre: string;
  num_proveedor: string;
  longitid: string;
  latitud: string;
};
