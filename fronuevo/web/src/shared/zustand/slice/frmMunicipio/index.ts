import { StateCreator } from "zustand";

export type ModelBackendMunicipio = {
  num_municipio: string;
  num_departamento_region: string;
  nombre: string;
  descripcion: string;
  registrado_por: string;
  fecha_registro: string;
  actualizado_por: string;
  ultima_fecha_actualizacion: string;
  Departamento: {
    nombre: string;
  };
};

export type ModelApiBackendMunicipio = {
  count: number;
  rows: ModelBackendMunicipio[];
};

export type ModelFrontedMunicipio = {
  id: string;
  idDepartamento: string;
  Nombre: string;
  Descripciòn: string;
  Registrado: string;
  Creacion: string;
  Actualizado: string;
  Actualizacion: string;
  Departamento: {
    nombre: string;
  };
};

export type ModelApiFrontendMunicipio = {
  count: number;
  rows: ModelFrontedMunicipio[];
};

//crear
export type ModelFrmMunicipioFormulario = {
  num_departamento: string;
  nombre: string;
  descripcion: string;
};
//para cbx dpto
export type ModelBackendGetDepartamento = {
  identificador: string;
  nombre: string;
};

export type ModelFrontendGetDepartamento = {
  id: string;
  nombre: string;
};

export type ModelApiFrontendGetDepartamento = {
  rows: ModelFrontendGetDepartamento[];
};

/*export type ModelApiBackendGetRegion = {
    rows: ModelBackendGetRegion[];
  };*/
/// actualizar
//actualizar
export type ModelFrmActualizarMunicipio = {
  //id:number,
  id: number;
  num_departamento: string;
  Departamento: string;
  nombre: string;
  descripcion: string;
};

export type ModelFormularioMunicipio = {
  idFrmMunicipioActualizar: string;
  idFrmMunicipioActualizarRegion: string;
  nombreFrmMunicipioActualizarRegion: string;
  nombreFrmMunicipioActualizar: string;
  descripcionFrmMunicipioActualizar: string;
  setValueFrmMunicipioActualizar: (
    id: string,
    num_region: string,
    region: string,
    nombre: string,
    descripcion: string
  ) => void;
};

export const createFrmMunicipioSlice: StateCreator<
  ModelFormularioMunicipio
> = (set) => ({
  idFrmMunicipioActualizar: "",
  idFrmMunicipioActualizarRegion: "",
  nombreFrmMunicipioActualizarRegion: "",
  nombreFrmMunicipioActualizar: "",
  descripcionFrmMunicipioActualizar: "",
  setValueFrmMunicipioActualizar: (
    id: string,
    num_region: string,
    region: string,
    nombre: string,
    descripcion: string
  ) =>
    set((state) => ({
      idFrmMunicipioActualizar: (state.idFrmMunicipioActualizar = id),
      idFrmMunicipioActualizarRegion: (state.idFrmMunicipioActualizarRegion =
        num_region),
      nombreFrmMunicipioActualizarRegion:
        (state.nombreFrmMunicipioActualizarRegion = region),
      nombreFrmMunicipioActualizar: (state.nombreFrmMunicipioActualizar =
        nombre),
      descripcionFrmMunicipioActualizar:
        (state.descripcionFrmMunicipioActualizar = descripcion),
    })),
});
