import { StateCreator } from "zustand";

export type ModelBackendRubro = {
  num_rubro: string;
  num_tipo_rubro: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  TipoRubro: {
    nombre: string;
  };
};

export type ModelApiBackendRubro = {
  count: number;
  rows: ModelBackendRubro[];
};

export type ModelFrontedRubro = {
  id: string;
  idTipoRubro: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
  TipoRubro: {
    nombre: string;
  };
};

export type ModelApiFrontendRubro = {
  count: number;
  rows: ModelFrontedRubro[];
};

//crear
export type ModelFrmRubroFormulario = {
  num_tipo_rubro: string;
  nombre: string;
  descripcion: string;
};



//actualizar
export type ModelFrmActualizarRubro = {
  id: number;
  num_tipo_rubro: string;
  TipotRubro: string;
  nombre: string;
  descripcion: string;
};

export type ModelFormularioRubro = {
  idFrmRubroActualizar: string;
  idFrmRubroActualizarRegion: string;
  nombreFrmRubroActualizarRegion: string;
  nombreFrmRubroActualizar: string;
  descripcionFrmRubroActualizar: string;
  setValueFrmRubroActualizar: (
    id: string,
    num_region: string,
    region: string,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmRubroSlice: StateCreator<
  ModelFormularioRubro
> = (set) => ({
  idFrmRubroActualizar: "",
  idFrmRubroActualizarRegion: "",
  nombreFrmRubroActualizarRegion: "",
  nombreFrmRubroActualizar: "",
  descripcionFrmRubroActualizar: "",
  setValueFrmRubroActualizar: (
    id: string,
    num_region: string,
    region: string,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmRubroActualizar: (state.idFrmRubroActualizar = id),
      idFrmRubroActualizarRegion: (state.idFrmRubroActualizarRegion =
        num_region),
      nombreFrmRubroActualizarRegion:
        (state.nombreFrmRubroActualizarRegion = region),
      nombreFrmRubroActualizar: (state.nombreFrmRubroActualizar =
        nombre),
      descripcionFrmRubroActualizar:
        (state.descripcionFrmRubroActualizar = descripcion),
    })),
});
