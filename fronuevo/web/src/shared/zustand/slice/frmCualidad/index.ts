import { StateCreator } from "zustand";

export type ModelBackendCualidad = {
  num_cualidad: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendCualidad = {
  count: number;
  rows: ModelBackendCualidad[];
};

export type ModelFrontedCualidad = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendCualidad = {
  count: number;
  rows: ModelFrontedCualidad[];
};

//crear
export type ModelFrmCualidadFormulario = {
  num_cualidad: number;
  nombre: string;
  descripcion: string;
};

//actualizar
/*export type ModelFrmActualizarCualidad = {
  num_cualidad: string;
  nombre: string;
  descripcion: string;
};*/

export type ModelFormularioCualidad = {
  idFrmCualidadActualizar: number;
  nombreFrmCualidadActualizar: string;
  descripcionFrmCualidadActualizar: string;
  setValueFrmCualidadActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmCualidadSlice: StateCreator<ModelFormularioCualidad> = (
  set
) => ({
  idFrmCualidadActualizar: 0,
  nombreFrmCualidadActualizar: "",
  descripcionFrmCualidadActualizar: "",
  setValueFrmCualidadActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmCualidadActualizar: (state.idFrmCualidadActualizar = id),
      nombreFrmCualidadActualizar: (state.nombreFrmCualidadActualizar = nombre),
      descripcionFrmCualidadActualizar: (state.descripcionFrmCualidadActualizar =
        descripcion),
    })),
});
