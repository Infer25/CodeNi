import { StateCreator } from "zustand";

export type ModelBackendDptoRegion = {
  num_departamento_region: string;
  num_region_pais: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  Region: {
    nombre: string;
  };
};

export type ModelApiBackendDptoRegion = {
  count: number;
  rows: ModelBackendDptoRegion[];
};

export type ModelFrontedDptoRegion = {
  id: string;
  region: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
  Region: {
    nombre: string;
  };
};

export type ModelApiFrontendDptoRegion = {
  count: number;
  rows: ModelFrontedDptoRegion[];
};

export type ModelBackendGetRegion = {
  identificador: string;
  nombre: string;
};

export type ModelApiBackendGetRegion = {
  rows: ModelBackendGetRegion[];
};

export type ModelFrontendGetRegion = {
  id: string;
  nombre: string;
};

export type ModelApiFrontendGetRegion = {
  rows: ModelFrontendGetRegion[];
};

//crear
export type ModelFrmDptoRegionFormulario = {
  num_region: string;
  nombre: string;
  descripcion: string;
};
//actualizar
export type ModelFrmActualizarDptoRegion = {
  //id:number,
  id: number;
  num_region: string;
  Region:string,
  nombre: string;
  descripcion: string;
};

export type ModelFormularioDepartamentonRegion = {
  idFrmDptoRegionActualizar: string;
  idFrmDptoRegionActualizarRegion: string;
  nombreFrmDptoRegionActualizarRegion: string;
  nombreFrmDptoRegionActualizar: string;
  descripcionFrmDptoRegionActualizar: string;
  setValueFrmDptoRegionActualizar: (
    id: string,
    num_region: string,
    region: string,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmDepartamentoRegionSlice: StateCreator<
  ModelFormularioDepartamentonRegion
> = (set) => ({
  idFrmDptoRegionActualizar: "",
  idFrmDptoRegionActualizarRegion: "",
  nombreFrmDptoRegionActualizarRegion: "",
  nombreFrmDptoRegionActualizar: "",
  descripcionFrmDptoRegionActualizar: "",
  setValueFrmDptoRegionActualizar: (
    id: string,
    num_region: string,
    region: string,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmDptoRegionActualizar: (state.idFrmDptoRegionActualizar = id),
      idFrmDptoRegionActualizarRegion:(state.idFrmDptoRegionActualizarRegion = num_region),
      nombreFrmDptoRegionActualizarRegion:(state.nombreFrmDptoRegionActualizarRegion = region),
      nombreFrmDptoRegionActualizar: (state.nombreFrmDptoRegionActualizar = nombre),
      descripcionFrmDptoRegionActualizar: (state.descripcionFrmDptoRegionActualizar = descripcion),
    })),
});
