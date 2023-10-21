import { PrivateRoutes } from "@/routes/routes";
import { RoutesNotFound } from "@/shared/utils/routesNotFound";
import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { BuscadorCatalogo } from "../buscadorCatalogo";
import { FrmListararea } from "../catalogo/cat_area/listar/frmArea";
import { FrmListarcargo } from "../catalogo/cat_cargo/listar/frmCargo";
import { FrmListarcategoria_proveedor } from "../catalogo/cat_categoria_proveedor/listar/frmcategoria_proveedor";
import { FrmListarclasificacion_empresa } from "../catalogo/cat_clasificacion_empresa/listar/frmclasificacion_empresa";
import { FrmActualizarColor } from "../catalogo/cat_color/actualizar/FrmActualizarColor";
import { FrmCrearColor } from "../catalogo/cat_color/crear/FrmCrearColor";
import { FrmListarColor } from "../catalogo/cat_color/listar";
import { FrmActualizarCualidad } from "../catalogo/cat_cualidad/actualizar/FrmActualizarCualidad";
import { FrmCrearCualidad } from "../catalogo/cat_cualidad/crear/FrmCrearColor";
import { FrmListarCualidad } from "../catalogo/cat_cualidad/listar";
import { FrmActualizarDptoRegion } from "../catalogo/cat_dpto_region/actualizar";
import { FrmCrearDptoRegion } from "../catalogo/cat_dpto_region/crear";
import { FrmDptoRegion } from "../catalogo/cat_dpto_region/listar/components/FrmListar";
import { FrmActualizarEstadoCivil } from "../catalogo/cat_estado_civil/actualizar/FrmActualizarEstadoCivil";
import { FrmCrearEstadoCivil } from "../catalogo/cat_estado_civil/crear/FrmCrearCatEstadoCivil";
import { FrmListarEstadoCivil } from "../catalogo/cat_estado_civil/listar/frmEstadoCivil";
import { FrmListarforma_pago } from "../catalogo/cat_forma_pago/listar/frmforma_pago";
import { FrmListarmodulo } from "../catalogo/cat_modulo/listar/frmModulo";
import { FrmActualizarMunicipio } from "../catalogo/cat_municipio/actualizar";
import { FrmCrearMunicipio } from "../catalogo/cat_municipio/crear/FrmCrearMunicipio";
import { FrmMunicipio } from "../catalogo/cat_municipio/listar/components/FrmListar";
import { FrmListarpermiso } from "../catalogo/cat_permiso/listar/frmPermiso";
import { FrmActualizarRegionPais } from "../catalogo/cat_region_pais/actualizar";
import { FrmCrearRegionPais } from "../catalogo/cat_region_pais/crear";
import { FrmRegionPais } from "../catalogo/cat_region_pais/listar/components/FrmListar";
import { FrmListarrol } from "../catalogo/cat_rol/listar/frmRol";
import { FrmActualizarRubro } from "../catalogo/cat_rubro/actualizar/actualizar";
import { FrmCrearRubro } from "../catalogo/cat_rubro/crear/FrmCrearRubro";
import { FrmListarRubro } from "../catalogo/cat_rubro/listar/components/frmListarRubro";
import { FrmActualizarSituacionClimatica } from "../catalogo/cat_situacion_climatica/actualizar/FrmActualizarSituacionClimatica";
import { FrmCrearSituacionClimatica } from "../catalogo/cat_situacion_climatica/crear/FrmCrearSitacionClimatica";
import { FrmListarSituacionClimatica } from "../catalogo/cat_situacion_climatica/listar/frmSituacionClimatica";
import { FrmListarsub_modulo } from "../catalogo/cat_sub_modulo/listar/frmsub_Modulo";
import { FrmActualizarTemporada } from "../catalogo/cat_temporada/actualizar/FrmActualizarTemporada";
import { FrmCrearTemporada } from "../catalogo/cat_temporada/crear/FrmCrearTemporada";
import { FrmListarTemporada } from "../catalogo/cat_temporada/listar";
import { FrmListarTipocolaborador } from "../catalogo/cat_tipo_colaborador/listar/frmTipoColaborador";
import { FrmListartipo_empresa } from "../catalogo/cat_tipo_empresa/listar/frmtipo_empresa";
import { FrmActualizarTipoIdentificacion } from "../catalogo/cat_tipo_identificacion/actualizar/FrmActualizarTipoIdentificacion";
import { FrmCrearTipoIdentificacion } from "../catalogo/cat_tipo_identificacion/crear/FrmCrearTipoIdentificacion";
import { FrmListarTipoIdentificacion } from "../catalogo/cat_tipo_identificacion/listar";
import { FrmActualizarTipoTierra } from "../catalogo/cat_tipo_tierra/actualizar/FrmActualizarTipoTierra";
import { FrmCrearTipoTierra } from "../catalogo/cat_tipo_tierra/crear/FrmCrearTipoTierra";
import { FrmListarTipoTierra } from "../catalogo/cat_tipo_tierra/listar/frmTipo_Tierra";
import { FrmListarColabradorUsuario } from "../catalogo/cat_usuario/listar/frmListarColaboradorUsuario";
import { FrmActualizarEstado } from "../catalogo/estado/actualizar/components";
import { FrmCrearEstado } from "../catalogo/estado/crear/components/frmCrearEstado";
import { FrmEstado } from "../catalogo/estado/listar/components/frmListar";
import { FrmActualizarTipoRubro } from "../catalogo/tipo_rubro/actualizar/FrmActualizarTipoRubro";
import { FrmCrearTipoRubro } from "../catalogo/tipo_rubro/crear/FrmCrearTipoRubro";
import { FrmListarTipoRubro } from "../catalogo/tipo_rubro/listar/components/frmTipoRubro";
import { FrmListRubroCoordenada } from "../proceso/Rubro_Coordenada/listar/frmRubroCoordenada";
import { FrmListarPersonaProveedor } from "../proceso/gestio_proveedor/listar/frmListarPersonaProveedor";
import { FrmListarCargoColabrador } from "../proceso/gestion_colaborador/asignacion_cargo/listar/frmListarColaborador";
import { FrmCrearPersona } from "../proceso/gestion_colaborador/crear/FrmCrearPersona";
import { FrmListarPersona } from "../proceso/gestion_colaborador/listar/frmListarPersona";
import { FrmListProveedorCoordenada } from "../proceso/proveedor_coordenada/listar/frmProveedorCoordenada";
import Mapa from "@/shared/components/mapa_";

const Sistema = lazy(() => import("@/shared/components/layout/sistema"));

function Private() {
  return (
    <RoutesNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.SISTEMA} />} />

      <Route path={`${PrivateRoutes.SISTEMA}/*`} element={<Sistema />}>
        <Route
          path={`${PrivateRoutes.COLABORADOR}`}
          element={<FrmListarPersona />}
        />
        <Route
          path={`${PrivateRoutes.COLABORADORCREAR}`}
          element={<FrmCrearPersona />}
        />
        <Route
          path={`${PrivateRoutes.ASIGNACIONCARGO}`}
          element={<FrmListarCargoColabrador />}
        />
        {/******************************/}
        <Route
          path={`${PrivateRoutes.CATALOGOS}`}
          element={<BuscadorCatalogo />}
        />
        {/******************************/}
        <Route path={`${PrivateRoutes.CATAREA}`} element={<FrmListararea />} />
        {/******************************/}
        <Route
          path={`${PrivateRoutes.CATREGIONPAIS}`}
          element={<FrmRegionPais />}
        />
        <Route
          path={`${PrivateRoutes.CATREGIONPAISACTUALIZAR}`}
          element={<FrmActualizarRegionPais />}
        />
        <Route
          path={`${PrivateRoutes.CATREGIONPAISCREAR}`}
          element={<FrmCrearRegionPais />}
        />
        {/******************************/}
        <Route
          path={`${PrivateRoutes.CATDEPARTAMENTOPAIS}`}
          element={<FrmDptoRegion />}
        />
        <Route
          path={`${PrivateRoutes.CATDEPARTAMENTOPAISCREAR}`}
          element={<FrmCrearDptoRegion />}
        />
        <Route
          path={`${PrivateRoutes.CATDEPARTAMENTOPAISACTUALIZAR}`}
          element={<FrmActualizarDptoRegion />}
        />
        {/******************************/}
        <Route path={`${PrivateRoutes.CATESTADO}`} element={<FrmEstado />} />
        <Route
          path={`${PrivateRoutes.CATESTADOACTUALIZAR}`}
          element={<FrmActualizarEstado />}
        />
        <Route
          path={`${PrivateRoutes.CATESTADOCREAR}`}
          element={<FrmCrearEstado />}
        />
        {/*************************************************/}
        <Route
          path={`${PrivateRoutes.CATMUNICIPIO}`}
          element={<FrmMunicipio />}
        />
        <Route
          path={`${PrivateRoutes.CATMUNICIPIOACTUALIZAR}`}
          element={<FrmActualizarMunicipio />}
        />
        <Route
          path={`${PrivateRoutes.CATMUNICIPIOCREAR}`}
          element={<FrmCrearMunicipio />}
        />
        {/*************************************************/}
        <Route
          path={`${PrivateRoutes.CATRUBRO}`}
          element={<FrmListarRubro />}
        />
        <Route
          path={`${PrivateRoutes.CATRUBROCREAR}`}
          element={<FrmCrearRubro />}
        />
        <Route
          path={`${PrivateRoutes.CATRUBROACTUALIZAR}`}
          element={<FrmActualizarRubro />}
        />
        {/**************************** */}
        <Route
          path={`${PrivateRoutes.CATTIPORUBRO}`}
          element={<FrmListarTipoRubro />}
        />
        <Route
          path={`${PrivateRoutes.CATTIPORUBROCREAR}`}
          element={<FrmCrearTipoRubro />}
        />
        <Route
          path={`${PrivateRoutes.CATTIPORUBROACTUALIZAR}`}
          element={<FrmActualizarTipoRubro />}
        />
        {/******************************/}
        <Route
          path={`${PrivateRoutes.CATCOLOR}`}
          element={<FrmListarColor />}
        />
        <Route
          path={`${PrivateRoutes.CATCOLORCREAR}`}
          element={<FrmCrearColor />}
        />
        <Route
          path={`${PrivateRoutes.CATCOLORACTUALIZAR}`}
          element={<FrmActualizarColor />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATCUALIDAD}`}
          element={<FrmListarCualidad />}
        />
        <Route
          path={`${PrivateRoutes.CATCUALIDADCREAR}`}
          element={<FrmCrearCualidad />}
        />
        <Route
          path={`${PrivateRoutes.CATCUALIDADACTUALIZAR}`}
          element={<FrmActualizarCualidad />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATSITUACIONCLIMATICA}`}
          element={<FrmListarSituacionClimatica />}
        />
        <Route
          path={`${PrivateRoutes.CATSITUACIONCLIMATICACREAR}`}
          element={<FrmCrearSituacionClimatica />}
        />
        <Route
          path={`${PrivateRoutes.CATSITUACIONCLIMATICAACTUALIZAR}`}
          element={<FrmActualizarSituacionClimatica />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATEMPORADA}`}
          element={<FrmListarTemporada />}
        />
        <Route
          path={`${PrivateRoutes.CATEMPORADACREAR}`}
          element={<FrmCrearTemporada />}
        />
        <Route
          path={`${PrivateRoutes.CATEMPORADAACTUALIZAR}`}
          element={<FrmActualizarTemporada />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATTIPOTIERRA}`}
          element={<FrmListarTipoTierra />}
        />
        <Route
          path={`${PrivateRoutes.CATTIPOTIERRACREAR}`}
          element={<FrmCrearTipoTierra />}
        />
        <Route
          path={`${PrivateRoutes.CATTIPOTIERRAACTUALIZAR}`}
          element={<FrmActualizarTipoTierra />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATTIPOIDENTIFICACION}`}
          element={<FrmListarTipoIdentificacion />}
        />
        <Route
          path={`${PrivateRoutes.CATTIPOIDENTIFICACIONCREAR}`}
          element={<FrmCrearTipoIdentificacion />}
        />
        <Route
          path={`${PrivateRoutes.CATTIPOIDENTIFICACIONACTUALIZAR}`}
          element={<FrmActualizarTipoIdentificacion />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATESTADOCIVIL}`}
          element={<FrmListarEstadoCivil />}
        />
        <Route
          path={`${PrivateRoutes.CATESTADOCIVILCREAR}`}
          element={<FrmCrearEstadoCivil />}
        />
        <Route
          path={`${PrivateRoutes.CATESTADOCIVILACTUALIZAR}`}
          element={<FrmActualizarEstadoCivil />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATTIPOCOLABORADOR}`}
          element={<FrmListarTipocolaborador />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATCARGO}`}
          element={<FrmListarcargo />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATPERMISO}`}
          element={<FrmListarpermiso />}
        />{" "}
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATMODULO}`}
          element={<FrmListarmodulo />}
        />
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATSUBMODULO}`}
          element={<FrmListarsub_modulo />}
        />
        {/*//////////////////////////////////////////////////*/}
        {/*//////////////////////////////////////////////////*/}
        <Route
          path={`${PrivateRoutes.CATCATEGORIAPROVEEDOR}`}
          element={<FrmListarcategoria_proveedor />}
        />
        <Route
          path={`${PrivateRoutes.CATFORMAPAGO}`}
          element={<FrmListarforma_pago />}
        />
        <Route
          path={`${PrivateRoutes.CATTIPOEMPRESA}`}
          element={<FrmListartipo_empresa />}
        />
        <Route
          path={`${PrivateRoutes.CATCLASIFICACIONEMPRESA}`}
          element={<FrmListarclasificacion_empresa />}
        />
        <Route
          path={`${PrivateRoutes.ASIGNACIONUSUARIO}`}
          element={<FrmListarColabradorUsuario />}
        />
        <Route path={`${PrivateRoutes.CATROL}`} element={<FrmListarrol />} />
        {/******************************************************************* */}
        <Route
          path={`${PrivateRoutes.CREACIONPROVEEDOR}`}
          element={<FrmListarPersonaProveedor />}
        />
        {/******************************************************************* */}
        <Route path={`${PrivateRoutes.MAPA}`} element={<Mapa />} />
        <Route
          path={`${PrivateRoutes.RUBROCOORDENADA}`}
          element={<FrmListRubroCoordenada />}
        />
        <Route
          path={`${PrivateRoutes.PROVEEDORCOORDENADA}`}
          element={<FrmListProveedorCoordenada />}
        />
      </Route>
    </RoutesNotFound>
  );
}

export default Private;
//<Route path={`${PrivateRoutes.MAPA}`} element={<Mapa />} />