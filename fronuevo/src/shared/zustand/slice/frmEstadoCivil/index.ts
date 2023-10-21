import { StateCreator } from "zustand";

export type ModelBackendEstadoCivil = {
  num_estado_civil: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendEstadoCivil = {
  count: number;
  rows: ModelBackendEstadoCivil[];
};

export type ModelFrontedEstadoCivil = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendEstadoCivil = {
  count: number;
  rows: ModelFrontedEstadoCivil[];
};

//crear
export type ModelFrmEstadoCivilFormulario = {
  num_estado_civil: number;
  nombre: string;
  descripcion: string;
};


export type ModelFormularioEstadoCivil = {
  idFrmEstadoCivilActualizar: number;
  nombreFrmEstadoCivilActualizar: string;
  descripcionFrmEstadoCivilActualizar: string;
  setValueFrmEstadoCivilActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmEstadoCivilSlice: StateCreator<ModelFormularioEstadoCivil> = (
  set
) => ({
  idFrmEstadoCivilActualizar: 0,
  nombreFrmEstadoCivilActualizar: "",
  descripcionFrmEstadoCivilActualizar: "",
  setValueFrmEstadoCivilActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmEstadoCivilActualizar: (state.idFrmEstadoCivilActualizar = id),
      nombreFrmEstadoCivilActualizar: (state.nombreFrmEstadoCivilActualizar = nombre),
      descripcionFrmEstadoCivilActualizar: (state.descripcionFrmEstadoCivilActualizar =
        descripcion),
    })),
});
