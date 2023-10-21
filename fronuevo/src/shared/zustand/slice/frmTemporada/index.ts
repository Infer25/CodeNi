import { StateCreator } from "zustand";

export type ModelBackendTemporada = {
  num_temporada: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendTemporada = {
  count: number;
  rows: ModelBackendTemporada[];
};

export type ModelFrontedTemporada = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendTemporada = {
  count: number;
  rows: ModelFrontedTemporada[];
};

//crear
export type ModelFrmTemporadaFormulario = {
  num_temporada: number;
  nombre: string;
  descripcion: string;
};


export type ModelFormularioTemporada = {
  idFrmTemporadaActualizar: number;
  nombreFrmTemporadaActualizar: string;
  descripcionFrmTemporadaActualizar: string;
  setValueFrmTemporadaActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmTemporadaSlice: StateCreator<ModelFormularioTemporada> = (
  set
) => ({
  idFrmTemporadaActualizar: 0,
  nombreFrmTemporadaActualizar: "",
  descripcionFrmTemporadaActualizar: "",
  setValueFrmTemporadaActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmTemporadaActualizar: (state.idFrmTemporadaActualizar = id),
      nombreFrmTemporadaActualizar: (state.nombreFrmTemporadaActualizar = nombre),
      descripcionFrmTemporadaActualizar: (state.descripcionFrmTemporadaActualizar =
        descripcion),
    })),
});
