import  LayoutPage  from "@/pages/Home";
import Login from "@/pages/Login";
import { BuscadorCatalogo } from "@/private/buscadorCatalogo";
import { FrmListararea } from "@/private/catalogo/cat_area/listar/frmArea";
import { FrmListarcargo } from "@/private/catalogo/cat_cargo/listar/frmCargo";
import { FrmActualizarColor } from "@/private/catalogo/cat_color/actualizar/FrmActualizarColor";
import { FrmCrearColor } from "@/private/catalogo/cat_color/crear/FrmCrearColor";
import { FrmListarColor } from "@/private/catalogo/cat_color/listar";
import { FrmActualizarCualidad } from "@/private/catalogo/cat_cualidad/actualizar/FrmActualizarCualidad";
import { FrmCrearCualidad } from "@/private/catalogo/cat_cualidad/crear/FrmCrearColor";
import { FrmListarCualidad } from "@/private/catalogo/cat_cualidad/listar";

import { FrmActualizarDptoRegion } from "@/private/catalogo/cat_dpto_region/actualizar";
import { FrmCrearDptoRegion } from "@/private/catalogo/cat_dpto_region/crear";
import { FrmDptoRegion } from "@/private/catalogo/cat_dpto_region/listar/components/FrmListar";
import { FrmActualizarEstadoCivil } from "@/private/catalogo/cat_estado_civil/actualizar/FrmActualizarEstadoCivil";
import { FrmCrearEstadoCivil } from "@/private/catalogo/cat_estado_civil/crear/FrmCrearCatEstadoCivil";
import { FrmListarEstadoCivil } from "@/private/catalogo/cat_estado_civil/listar/frmEstadoCivil";
import { FrmListarmodulo } from "@/private/catalogo/cat_modulo/listar/frmModulo";
import { FrmActualizarMunicipio } from "@/private/catalogo/cat_municipio/actualizar";
import { FrmCrearMunicipio } from "@/private/catalogo/cat_municipio/crear/FrmCrearMunicipio";
import { FrmMunicipio } from "@/private/catalogo/cat_municipio/listar/components/FrmListar";
import { FrmListarpermiso } from "@/private/catalogo/cat_permiso/listar/frmPermiso";
import { FrmActualizarRegionPais } from "@/private/catalogo/cat_region_pais/actualizar";
import { FrmCrearRegionPais } from "@/private/catalogo/cat_region_pais/crear";
import { FrmRegionPais } from "@/private/catalogo/cat_region_pais/listar/components/FrmListar";
import { FrmListarrol } from "@/private/catalogo/cat_rol/listar/frmRol";
import { FrmActualizarRubro } from "@/private/catalogo/cat_rubro/actualizar/actualizar";
import { FrmCrearRubro } from "@/private/catalogo/cat_rubro/crear/FrmCrearRubro";
import { FrmListarRubro } from "@/private/catalogo/cat_rubro/listar/components/frmListarRubro";
import { FrmActualizarSituacionClimatica } from "@/private/catalogo/cat_situacion_climatica/actualizar/FrmActualizarSituacionClimatica";

import { FrmCrearSituacionClimatica } from "@/private/catalogo/cat_situacion_climatica/crear/FrmCrearSitacionClimatica";
import { FrmListarSituacionClimatica } from "@/private/catalogo/cat_situacion_climatica/listar/frmSituacionClimatica";
import { FrmListarsub_modulo } from "@/private/catalogo/cat_sub_modulo/listar/frmsub_Modulo";
import { FrmActualizarTemporada } from "@/private/catalogo/cat_temporada/actualizar/FrmActualizarTemporada";
import { FrmCrearTemporada } from "@/private/catalogo/cat_temporada/crear/FrmCrearTemporada";
import { FrmListarTemporada } from "@/private/catalogo/cat_temporada/listar";
import { FrmListarTipocolaborador } from "@/private/catalogo/cat_tipo_colaborador/listar/frmTipoColaborador";
import { FrmActualizarTipoIdentificacion } from "@/private/catalogo/cat_tipo_identificacion/actualizar/FrmActualizarTipoIdentificacion";
import { FrmCrearTipoIdentificacion } from "@/private/catalogo/cat_tipo_identificacion/crear/FrmCrearTipoIdentificacion";
import { FrmListarTipoIdentificacion } from "@/private/catalogo/cat_tipo_identificacion/listar";
import { FrmActualizarTipoTierra } from "@/private/catalogo/cat_tipo_tierra/actualizar/FrmActualizarTipoTierra";
import { FrmCrearTipoTierra } from "@/private/catalogo/cat_tipo_tierra/crear/FrmCrearTipoTierra";
import { FrmListarTipoTierra } from "@/private/catalogo/cat_tipo_tierra/listar/frmTipo_Tierra";
import { FrmListarColabradorUsuario } from "@/private/catalogo/cat_usuario/listar/frmListarColaboradorUsuario";

import { FrmActualizarEstado } from "@/private/catalogo/estado/actualizar/components";
import { FrmCrearEstado } from "@/private/catalogo/estado/crear/components/frmCrearEstado";
import { FrmEstado } from "@/private/catalogo/estado/listar/components/frmListar";
import { FrmActualizarTipoRubro } from "@/private/catalogo/tipo_rubro/actualizar/FrmActualizarTipoRubro";
import { FrmCrearTipoRubro } from "@/private/catalogo/tipo_rubro/crear/FrmCrearTipoRubro";
import { FrmListarTipoRubro } from "@/private/catalogo/tipo_rubro/listar/components/frmTipoRubro";
import { FrmListarCargoColabrador } from "@/private/proceso/gestion_colaborador/asignacion_cargo/listar/frmListarColaborador";
import { FrmCrearPersona } from "@/private/proceso/gestion_colaborador/crear/FrmCrearPersona";
import { FrmListarPersona } from "@/private/proceso/gestion_colaborador/listar/frmListarPersona";

import Sistema from "@/shared/components/layout/sistema";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "home",
        element: <h1>home</h1>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "Nosotros",
        element: <h1>Nosotros</h1>,
      },
      {
        path: "Contactanos",
        element: <h1>Contactanos</h1>,
      },
    ],
  },
  {
    path: "sistema",

    element: <Sistema />,

    children: [
      ///gestion del sistema

      {
        //base
        path: "viewCatalogo",
        element: <BuscadorCatalogo />,
      },
      {
        path: "viewCatalogo/:estado",
        element: <FrmEstado />,
      },
      {
        
        path: "viewCatalogo/estado/actualizar",
        element: <FrmActualizarEstado />,
      },
      {
       
        path: "viewCatalogo/estado/crear",
        element: <FrmCrearEstado />,
      },
      //////////////////////
      ////REGION PAIS
      {
        path: "viewCatalogo/regionPais",
        element: <FrmRegionPais />,
      },
      {
        path: "viewCatalogo/regionPais/actualizar",
        element: <FrmActualizarRegionPais />,
      },
      {
        path: "viewCatalogo/regionPais/crear",
        element: <FrmCrearRegionPais />,
      },
      ///////////////////////////////////////////
      //DPTOREGION
      {
        path: "viewCatalogo/dptoRegion",
        element: <FrmDptoRegion />,
      },
      {
        path: "viewCatalogo/dptoRegion/crear",
        element: <FrmCrearDptoRegion />,
      },
      {
        path: "viewCatalogo/dptoRegion/actualizar",
        element: <FrmActualizarDptoRegion />,
      },
      ///////municipio

      {
        path: "viewCatalogo/municipio",
        element: <FrmMunicipio />,
      },

      {
        path: "viewCatalogo/municipio/crear",
        element: <FrmCrearMunicipio />,
      },
      {
        path: "viewCatalogo/municipio/actualizar",
        element: <FrmActualizarMunicipio />,
      },
      ////tipo de rurbo
      {
        path: "viewCatalogo/tipoRubro",
        element: <FrmListarTipoRubro />,
      },
      {
        path: "viewCatalogo/tipoRubro/crear",
        element: <FrmCrearTipoRubro />,
      },
      {
        path: "viewCatalogo/tipoRubro/actualizar",
        element: <FrmActualizarTipoRubro />,
      },
      ///rubro
      {
        path: "viewCatalogo/rubro",
        element: <FrmListarRubro />,
      },
      {
        path: "viewCatalogo/rubro/crear",
        element: <FrmCrearRubro />,
      },
      {
        path: "viewCatalogo/rubro/actualizar",
        element: <FrmActualizarRubro />,
      },
      ///Color
      {
        path: "viewCatalogo/color",
        element: <FrmListarColor />,
      },
      {
        path: "viewCatalogo/color/crear",
        element: <FrmCrearColor />,
      },
      {
        path: "viewCatalogo/color/actualizar",
        element: <FrmActualizarColor />,
      },
      ///cualidad

      {
        path: "viewCatalogo/cualidad",
        element: <FrmListarCualidad />,
      },
      {
        path: "viewCatalogo/cualidad/crear",
        element: <FrmCrearCualidad />,
      },

      {
        path: "viewCatalogo/cualidad/actualizar",
        element: <FrmActualizarCualidad />,
      },
      ///tolerancia
      {
        path: "viewCatalogo/situacion_climatica",
        element: <FrmListarSituacionClimatica />,
      },

      {
        path: "viewCatalogo/situacion_climatica/crear",
        element: <FrmCrearSituacionClimatica />,
      },
      {
        path: "viewCatalogo/situacion_climatica/actualizar",
        element: <FrmActualizarSituacionClimatica />,
      },
      ////temporada

      {
        path: "viewCatalogo/temporada",
        element: <FrmListarTemporada />,
      },
      {
        path: "viewCatalogo/temporada/crear",
        element: <FrmCrearTemporada />,
      },
      {
        path: "viewCatalogo/temporada/actualizar",
        element: <FrmActualizarTemporada />,
      },
      ///tipo de tierra

      {
        path: "viewCatalogo/tipo_tierra",
        element: <FrmListarTipoTierra />,
      },
      {
        path: "viewCatalogo/tipo_tierra/crear",
        element: <FrmCrearTipoTierra />,
      },
      {
        path: "viewCatalogo/tipo_tierra/actualizar",
        element: <FrmActualizarTipoTierra />,
      },

      ////TipoIdentificacion

      {
        path: "viewCatalogo/tipo_identificacion",
        element: <FrmListarTipoIdentificacion />,
      },

      {
        path: "viewCatalogo/tipo_identificacion/crear",
        element: <FrmCrearTipoIdentificacion />,
      },
      {
        path: "viewCatalogo/tipo_identificacion/actualizar",
        element: <FrmActualizarTipoIdentificacion />,
      },
      ////////////////////////////////GESTION DE COLABORADOR
      {
        path: "listar_colaborador",
        element: <FrmListarPersona />,
      },
      {
        path: "listar_colaborador/crear",
        element: <FrmCrearPersona />,
      },

      //estado_civil

      {
        path: "viewCatalogo/estado_civil",
        element: <FrmListarEstadoCivil />,
      },
      {
        path: "viewCatalogo/estado_civil/crear",
        element: <FrmCrearEstadoCivil />,
      },
      {
        path: "viewCatalogo/estado_civil/actualizar",
        element: <FrmActualizarEstadoCivil />,
      },
      ///
      {
        path: "viewCatalogo/tipo_colaborador",
        element: <FrmListarTipocolaborador />,
      },
      ///area
      {
        path: "viewCatalogo/area",
        element: <FrmListararea />,
      },
      ///cargo
      {
        path: "viewCatalogo/cargo",
        element: <FrmListarcargo />,
      },
      //
      {
        path: "list_colaborador",
        element: <FrmListarCargoColabrador />,
      },
      ///

      {
        path: "viewCatalogo/rol",
        element: <FrmListarrol />,
      },
      //
      {
        path: "viewCatalogo/permiso",
        element: <FrmListarpermiso />,
      },
      {
        path: "viewCatalogo/modulo",
        element: <FrmListarmodulo />,
      },
      //
      {
        path: "viewCatalogo/sub_modulo",
        element: <FrmListarsub_modulo />,
      }, //

      {
        path: "list_colaborador_Usuario",
        element: <FrmListarColabradorUsuario />,
      },
      //
      {
        //base
        path: "consulta",
        element: <h1>HOLA DESDE CONSULTA</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>error</h1>,
    errorElement: <h1>error s</h1>,
  },
]);

/*

     {
          path: "catalogo/:estado",
          element: <RegistroEstado />,
        },

        */
