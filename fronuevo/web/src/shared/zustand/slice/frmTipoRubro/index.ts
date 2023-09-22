import { StateCreator } from "zustand";

export type ModelBackendTipoRubro = {
  num_tipo_rubro: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendTipoRubro = {
  count: number;
  rows: ModelBackendTipoRubro[];
};

export type ModelFrontedTipoRubro = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendTipoRubro = {
  count: number;
  rows: ModelFrontedTipoRubro[];
};

//crear
export type ModelFrmTipoRubroFormulario = {
  num_tipo_rubro: string;
  nombre: string;
  descripcion: string;
};
//actualizar
export type ModelFrmActualizarTipoRubro = {
  id: number;
  nombre: string;
  descripcion: string;
};

export type ModelFormularioTipoRubro = {
  idFrmTipoRubro: number;
  nombreFrmTipoRubro: string;
  descripcionFrmTipoRubro: string;
  setValueFrmTipoRubro: (
    id: string,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmTipoRubro: StateCreator<ModelFormularioTipoRubro> = (
  set
) => ({
  idFrmTipoRubro: 0,
  nombreFrmTipoRubro: "",
  descripcionFrmTipoRubro: "",
  setValueFrmTipoRubro: (id: string, nombre: string, descripcion: string) =>
    set((state) => ({
      idFrmTipoRubro: (state.idFrmTipoRubro = +id),
      nombreFrmTipoRubro: (state.nombreFrmTipoRubro = nombre),
      descripcionFrmTipoRubro: (state.descripcionFrmTipoRubro = descripcion),
    })),
});
