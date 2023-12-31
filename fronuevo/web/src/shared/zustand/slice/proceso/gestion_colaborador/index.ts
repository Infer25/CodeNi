import { AlertColor } from "@mui/material";
import { StateCreator } from "zustand";

export type ModelTipoIdentificacionPersona = {
  nombre: string;
};

export type ModelIdentificacion = {
  identificacion: string;
  tipo_identificador: ModelTipoIdentificacionPersona[];
};

export type ModelApiBackendPersona = {
  num_persona: number;
  fechanac_fechaconstitucion: string;
  origen: number;
  nombre: string;
  apellido_razonsocial: string;
  movil: string;
  email: string;
  direccion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  municipio: {
    nombre: string;
  };
  persona_identificador: ModelIdentificacion[];
};

export type ModelApiBackendPersonaModelApiBackendPersona = {
  count: number;
  rows: ModelApiBackendPersona[];
};

export type ModelFrontedPersonaModelApiBackendPersona = {
  num_persona: number;
  fechanac_fechaconstitucion: string;
  origen: number;
  nombre: string;
  apellido_razonsocial: string;
  movil: string;
  email: string;
  direccion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  municipio: {
    nombre: string;
  };
  persona_identificador: ModelIdentificacion[];
};

export type ModelApiFrontendPersonaModelApiBackendPersona = {
  count: number;
  rows: ModelFrontedPersonaModelApiBackendPersona[];
};

export type ModelBackendGetCBX = {
  identificador: string;
  nombre: string;
};

export type ModelFrontendGetMunicipio = {
  id: string;
  nombre: string;
};

export type ModelApiFrontendGetMunicipio = {
  //municipio y tipoIdentificacion
  rows: ModelFrontendGetMunicipio[];
};

//crear

export interface tbl_persona_identificacion {
  id: string;
  num_tipo_identificacion: number;
  nombre_identificacion?: string;
  identificacion: string;
}

export interface tbl_persona_identificacionListaFin {
  lista: tbl_persona_identificacion[];
}

export type ModelFrmPersona = {
  num_persona: number;
  fechanac_fechaconstitucion: string;
  origen: string;
  nombre: string;
  apellido_razonsocial: string;
  movil: string;
  email: string;
  direccion: string;
  registrado_por: string;
  actualizado_por: string;
  identificacio: tbl_persona_identificacion[];
};

export type ModelAlert = {
  title: string;
  state: AlertColor;
};

export type ModelTableBodyAgregarIdentificacion = {
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAlertopenAlertError: React.Dispatch<
    React.SetStateAction<ModelAlert | undefined>
  >;
  list: tbl_persona_identificacion[];
};

export type ModelFormularioPersonaModelApiBackendPersona = {
  listTipoIdentificacionFrmAgregarPersona: tbl_persona_identificacion[];

  setValueListFrmAgregarIdentificacion: (
    list: tbl_persona_identificacion
  ) => void;
  clearListFrmAgregarIdentificacion: () => void;
  clearOnlyOneListFrmAgregarIdentificacion: (id: string) => void;
};

export const createFrmPersonaModelApiBackendPersonaSlice: StateCreator<
  ModelFormularioPersonaModelApiBackendPersona
> = (set) => ({
  listTipoIdentificacionFrmAgregarPersona: [],

  setValueListFrmAgregarIdentificacion: (list: tbl_persona_identificacion) =>
    set((state) => ({
      listTipoIdentificacionFrmAgregarPersona: [
        ...state.listTipoIdentificacionFrmAgregarPersona,
        list,
      ],
    })),
  clearListFrmAgregarIdentificacion: () =>
    set(() => ({
      listTipoIdentificacionFrmAgregarPersona: [],
    })),
  clearOnlyOneListFrmAgregarIdentificacion: (id: string) =>
    set((state) => ({
      listTipoIdentificacionFrmAgregarPersona: [
        ...state.listTipoIdentificacionFrmAgregarPersona.filter(
          (x) => x.nombre_identificacion != id
        ),
      ],
    })),

});
// ({listTipoIdentificacionFrmAgregarPersona: [...(state.listTipoIdentificacionFrmAgregarPersona = [ { num_tipo_identificacion, nombre_identificacion, identificacion },]),] })),
