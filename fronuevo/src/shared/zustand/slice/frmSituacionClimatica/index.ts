import { StateCreator } from "zustand";

export type ModelBackendSituacionClimatica = {
  num_situacion_climatica: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendSituacionClimatica = {
  count: number;
  rows: ModelBackendSituacionClimatica[];
};

export type ModelFrontedSituacionClimatica = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendSituacionClimatica = {
  count: number;
  rows: ModelFrontedSituacionClimatica[];
};

//crear
export type ModelFrmSituacionClimaticaFormulario = {
  num_situacion_climatica: number;
  nombre: string;
  descripcion: string;
};



export type ModelFormularioSituacionClimatica = {
  idFrmSituacionClimaticaActualizar: number;
  nombreFrmSituacionClimaticaActualizar: string;
  descripcionFrmSituacionClimaticaActualizar: string;
  setValueFrmSituacionClimaticaActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmSituacionClimaticaSlice: StateCreator<ModelFormularioSituacionClimatica> = (
  set
) => ({
  idFrmSituacionClimaticaActualizar: 0,
  nombreFrmSituacionClimaticaActualizar: "",
  descripcionFrmSituacionClimaticaActualizar: "",
  setValueFrmSituacionClimaticaActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmSituacionClimaticaActualizar: (state.idFrmSituacionClimaticaActualizar = id),
      nombreFrmSituacionClimaticaActualizar: (state.nombreFrmSituacionClimaticaActualizar = nombre),
      descripcionFrmSituacionClimaticaActualizar: (state.descripcionFrmSituacionClimaticaActualizar =
        descripcion),
    })),
});
