import { create } from "zustand";
import { ModelFormularioColor, createFrmColorSlice } from "../slice/frmColor";
import {
  ModelFormularioCualidad,
  createFrmCualidadSlice,
} from "../slice/frmCualidad";
import {
  ModelFormularioDepartamentonRegion,
  createFrmDepartamentoRegionSlice,
} from "../slice/frmDptoRegion";
import {
  ModelFormularioEstado,
  createFrmEstadoSlice,
} from "../slice/frmEstado";
import {
  ModelFormularioMunicipio,
  createFrmMunicipioSlice,
} from "../slice/frmMunicipio";
import {
  ModelFormularioRegionPais,
  createFrmRegionPaisSlice,
} from "../slice/frmRegionPais";
import { ModelFormularioRubro, createFrmRubroSlice } from "../slice/frmRubro";
import {
  ModelFormularioTipoRubro,
  createFrmTipoRubro,
} from "../slice/frmTipoRubro";

import {
  ModelFormularioSituacionClimatica,
  createFrmSituacionClimaticaSlice,
} from "../slice/frmSituacionClimatica";
import {
  ModelFormularioTemporada,
  createFrmTemporadaSlice,
} from "../slice/frmTemporada";
import { ModelFormularioTipoIdentificacion, createFrmTipoIdentificacionSlice } from "../slice/frmTipoIdentificacion";
import {
  ModelFormularioTipoTierra,
  createFrmTipoTierraSlice,
} from "../slice/frmTipoTierra";
import { MenuSlice, createMenuSlice } from "../slice/menu";
import { ThemeSlice, createThemeSlice } from "../slice/theme";
import { ModelFormularioPersonaModelApiBackendPersona,createFrmPersonaModelApiBackendPersonaSlice } from "../slice/proceso/gestion_colaborador";

export const useStoreGlobal = create<
  ThemeSlice &
    MenuSlice &
    ModelFormularioEstado &
    ModelFormularioRegionPais &
    ModelFormularioDepartamentonRegion &
    ModelFormularioMunicipio &
    ModelFormularioTipoRubro &
    ModelFormularioRubro &
    ModelFormularioColor &
    ModelFormularioCualidad &
    ModelFormularioSituacionClimatica &
    ModelFormularioTemporada &
    ModelFormularioTipoTierra &
    ModelFormularioTipoIdentificacion &
    ModelFormularioPersonaModelApiBackendPersona
>()((...a) => ({
  ...createThemeSlice(...a),
  ...createMenuSlice(...a),
  ...createFrmEstadoSlice(...a),
  ...createFrmRegionPaisSlice(...a),
  ...createFrmDepartamentoRegionSlice(...a),
  ...createFrmMunicipioSlice(...a),
  ...createFrmTipoRubro(...a),
  ...createFrmRubroSlice(...a),
  ...createFrmColorSlice(...a),
  ...createFrmCualidadSlice(...a),
  ...createFrmSituacionClimaticaSlice(...a),
  ...createFrmTemporadaSlice(...a),
  ...createFrmTipoTierraSlice(...a),
  ...createFrmTipoIdentificacionSlice(...a),
  ...createFrmPersonaModelApiBackendPersonaSlice(...a)
}));
