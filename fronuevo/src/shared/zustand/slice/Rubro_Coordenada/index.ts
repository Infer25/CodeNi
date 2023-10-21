

export interface ListaCoordenada {
    id: number;
    coordenada: string;
  }

export interface Tbl_rubro_coordenada_Backend  {
  num_rubro_coordenada: number;
  num_departamento_region: string;
  num_rubro: string;
  longitud: string;
  latitud: string;
  coordenada: {
    x: string;
    y: string;
  };
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  ModelRubro: {
    nombre: string;
  };
  ModelDepartamento: {
    nombre: string;
  };
  }


 
  
  export type ModelMapGetTbl_rubro_coordenada_Backend_Backend = {
    count:number;
    rows: Tbl_rubro_coordenada_Backend[];
  };
  

  export interface Tbl_rubro_coordenada_Frontend  {
    num_rubro_coordenada: number;
    num_departamento_region: string;
    num_rubro: string;
    longitud?: string;
    latitud?: string;
    coordenada: {
      x: string;
      y: string;
    };
    registrado_por: string;
    fecha_registro: string;
    actualizado_por: string;
    ultima_fecha_actualizacion: string;
    ModelRubro: {
      nombre: string;
    };
    ModelDepartamento: {
      nombre: string;
    };
  }
 
 
  
  export type ModelMapGetTbl_rubro_coordenada_Backend_Frontend= {
    count:number;
    rows: Tbl_rubro_coordenada_Frontend[];
  };
  

  
//crear

export interface ModelFrmrol_Tbl_rubro_coordenada_Crear {
  num_rubro_coordenada?:string;
  num_departamento: string;
  num_rubro:  string;
  longitid:string;
  latitud:string;

}









export interface Departamento {
  num_departamento_region: number;
  nombre: string;
}

export type ModelMapGetDepartamento = {
  rows: Departamento[];
};


export interface Rubro {
  num_rubro: number;
  nombre: string;
}

export type ModelMapGetRubro = {
  rows: Rubro[];
};