import { StateCreator } from "zustand";

export type ModelBackendTipoIdentificacion = {
  num_tipo_identificacion: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendTipoIdentificacion = {
  count: number;
  rows: ModelBackendTipoIdentificacion[];
};

export type ModelFrontedTipoIdentificacion = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendTipoIdentificacion = {
  count: number;
  rows: ModelFrontedTipoIdentificacion[];
};

//crear
export type ModelFrmTipoIdentificacionFormulario = {
  num_tipo_identificacion: number;
  nombre: string;
  descripcion: string;
};

export type ModelFormularioTipoIdentificacion = {
  idFrmTipoIdentificacionActualizar: number;
  nombreFrmTipoIdentificacionActualizar: string;
  descripcionFrmTipoIdentificacionActualizar: string;
  setValueFrmTipoIdentificacionActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmTipoIdentificacionSlice: StateCreator<
  ModelFormularioTipoIdentificacion
> = (set) => ({
  idFrmTipoIdentificacionActualizar: 0,
  nombreFrmTipoIdentificacionActualizar: "",
  descripcionFrmTipoIdentificacionActualizar: "",
  setValueFrmTipoIdentificacionActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmTipoIdentificacionActualizar:
        (state.idFrmTipoIdentificacionActualizar = id),
      nombreFrmTipoIdentificacionActualizar:
        (state.nombreFrmTipoIdentificacionActualizar = nombre),
      descripcionFrmTipoIdentificacionActualizar:
        (state.descripcionFrmTipoIdentificacionActualizar = descripcion),
    })),
});
