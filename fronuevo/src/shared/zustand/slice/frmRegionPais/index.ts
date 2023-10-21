import { StateCreator } from "zustand";

export type ModelTexfieldFrmRegionPais={
  label: string,
  placeHolder: string,
  
}
//crear
export type ModelFrmRegionPaisFormulario ={
  nombre:string,
  descripcion:string
}
//actualizar
export type ModelFrmActualizarRegionPais ={
  //id:number,
  id: number,
  nombre: string,
  descripcion: string,
}
//tabla



export type ModelBackendRegionPais = {
  num_region_pais: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendRegionPais = {
  count: number;
  rows: ModelBackendRegionPais[];
};

export type ModelFronteddEstado = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  ["Registrado"]: string;
  ["Creacion"]: string;
  ["Actualizado"]: string;
  ["Actualizacion"]: string;
};

export type ModelApiFrontendRegionPais = {
  count: number;
  rows: ModelFronteddEstado[];
};

///formulario

export type ModelFormularioRegiopaisItem = {
  id: string;
  nombre: string;
  descripcion: string;
};

export type ModelFormularioRegionPais = {
  idFrmRegionPais: string;
  nombreFrmRegionPais: string;
  descripcionFrmRegionPais: string;
  setValueFrmRegionPais: (
    id: string,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmRegionPaisSlice: StateCreator<ModelFormularioRegionPais> = (
  set
) => ({
  idFrmRegionPais: "",
  nombreFrmRegionPais: "",
  descripcionFrmRegionPais: "",
  setValueFrmRegionPais: (id: string, nombre: string, descripcion: string) =>
    set((state) => ({
      idFrmRegionPais: (state.idFrmRegionPais = id),
      nombreFrmRegionPais: (state.nombreFrmRegionPais = nombre),
      descripcionFrmRegionPais: (state.descripcionFrmRegionPais = descripcion),
    })),
});
