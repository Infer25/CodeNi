//tabla

import { StateCreator } from "zustand";

export type ModelBackendEstado = {
  num_estado: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelBackendEstado_ = {
  count: number;
  rows: ModelBackendEstado[];
};

export type ModelFronteddEstado = {
  id: string;
  Estado: string;
  Descripciòn: string;
  ["registrado por"]: string;
  ["Fecha de registro"]: string;
  actualizadopor: string;
  ultimafechaactualizacion: string;
};

export type ModelFronteddEstado_ = {
  count: number;
  rows: ModelFronteddEstado[];
};

///formulario

export type ModelFormularioEstadoItem = {
  id: string;
  nombre: string;
  descripcion: string;
};

export type ModelFormularioEstado = {
  id: string;
  nombre: string;
  descripcion: string;
  setValueFrmEstado: (id: string, nombre: string, descripcion: string) => void;
};

export const createFrmEstadoSlice: StateCreator<ModelFormularioEstado> = (
  set
) => ({
  id: "",
  nombre: "",
  descripcion: "",
  setValueFrmEstado: (id: string, nombre: string, descripcion: string) =>
    set((state) => ({
      id: (state.id = id),
      nombre: (state.nombre = nombre),
      descripcion: (state.descripcion = descripcion),
    })),
});
