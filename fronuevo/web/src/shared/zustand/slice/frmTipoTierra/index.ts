import { StateCreator } from "zustand";

export type ModelBackendTipoTierra = {
  num_tipo_tierra: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
};

export type ModelApiBackendTipoTierra = {
  count: number;
  rows: ModelBackendTipoTierra[];
};

export type ModelFrontedTipoTierra = {
  id: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
};

export type ModelApiFrontendTipoTierra = {
  count: number;
  rows: ModelFrontedTipoTierra[];
};

//crear
export type ModelFrmTipoTierraFormulario = {
  num_tipo_tierra: number;
  nombre: string;
  descripcion: string;
};


export type ModelFormularioTipoTierra = {
  idFrmTipoTierraActualizar: number;
  nombreFrmTipoTierraActualizar: string;
  descripcionFrmTipoTierraActualizar: string;
  setValueFrmTipoTierraActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmTipoTierraSlice: StateCreator<ModelFormularioTipoTierra> = (
  set
) => ({
  idFrmTipoTierraActualizar: 0,
  nombreFrmTipoTierraActualizar: "",
  descripcionFrmTipoTierraActualizar: "",
  setValueFrmTipoTierraActualizar: (
    id: number,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmTipoTierraActualizar: (state.idFrmTipoTierraActualizar = id),
      nombreFrmTipoTierraActualizar: (state.nombreFrmTipoTierraActualizar = nombre),
      descripcionFrmTipoTierraActualizar: (state.descripcionFrmTipoTierraActualizar =
        descripcion),
    })),
});
