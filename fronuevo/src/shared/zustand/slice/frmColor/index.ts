import { StateCreator } from "zustand";

export type ModelBackendColor = {
  num_color: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendColor = {
  count: number;
  rows: ModelBackendColor[];
};

export type ModelFrontedColor = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendColor = {
  count: number;
  rows: ModelFrontedColor[];
};

//crear
export type ModelFrmColorFormulario = {
  num_color: number;
  nombre: string;
  descripcion: string;
};

//actualizar
/*export type ModelFrmActualizarColor = {
  num_color: string;
  nombre: string;
  descripcion: string;
};*/

export type ModelFormularioColor = {
  idFrmColorActualizar: number;
  nombreFrmColorActualizar: string;
  descripcionFrmColorActualizar: string;
  setValueFrmColorActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmColorSlice: StateCreator<ModelFormularioColor> = (
  set
) => ({
  idFrmColorActualizar: 0,
  nombreFrmColorActualizar: "",
  descripcionFrmColorActualizar: "",
  setValueFrmColorActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmColorActualizar: (state.idFrmColorActualizar = id),
      nombreFrmColorActualizar: (state.nombreFrmColorActualizar = nombre),
      descripcionFrmColorActualizar: (state.descripcionFrmColorActualizar =
        descripcion),
    })),
});
