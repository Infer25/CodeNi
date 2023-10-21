import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import {
  CategoriaProveedor,
  ClasificacionEmpresa,
  CrearProveedor,
  FormaPago,
  ModelApiBackendProveedorListPersona,
  TipoEmpresa,
} from "@/shared/zustand/slice/proceso/frm_proveedor";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllProveedor } from "../adapter";
import { useAuth } from "@/shared/zustand/slice/Auth";

export const ServicesProveedor = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.Proveedor}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllProveedor(
      (await Api.get<ModelApiBackendProveedorListPersona>(query)).data
    );
    return valor;
  },
  getAllTipoEmpresa: async function () {
    const query = `${Rutas.Proveedor}/getTipoEmpresa`;
    const valor = (await Api.get<TipoEmpresa[]>(query)).data;

    return valor;
  },
  getAllClasificacionEmpresa: async function () {
    const query = `${Rutas.Proveedor}/getClasificacionEmpresa`;
    const valor = (await Api.get<ClasificacionEmpresa[]>(query)).data;

    return valor;
  },
  getAllCategoriaProveedor: async function () {
    const query = `${Rutas.Proveedor}/getCategoriaProveedor`;
    const valor = (await Api.get<CategoriaProveedor[]>(query)).data;

    return valor;
  },

  getAllFormaPago: async function () {
    const query = `${Rutas.Proveedor}/getFormaPago`;
    const valor = (await Api.get<FormaPago[]>(query)).data;

    return valor;
  },
  create: async (data_: CrearProveedor) => {
    const registrado_por = useAuth.getState().num_colaborador;
    const {
      num_persona,
      cantidad_dias_espera,
      num_clasificacion_empresa,
      num_tipo_empresa,
      list_categoria_proveedor,
      list_forma_pago,
    } = data_;

    try {
      const { data } = await Api.post(`${Rutas.Proveedor}/create/`, {
        num_persona:+num_persona,
        num_tipo_empresa:+num_tipo_empresa,
        num_clasificacion_empresa:+num_clasificacion_empresa,
        cantidad_dias_espera:+cantidad_dias_espera,
        registrado_por: +registrado_por,
        list_categoria_proveedor: list_categoria_proveedor,
        list_forma_pago: list_forma_pago,
      });
      if (data) {
        Swal.fire({
          allowOutsideClick: false,
          focusConfirm: false,
          showCloseButton: true,
          customClass: {
            container: "body",
          },
          text: "Registro exitoso",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Swal.fire({
          focusConfirm: false,
          showCloseButton: true,
          text: e.request.response,
          icon: "error",
          customClass: {
            container: "body",
          },
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          focusConfirm: false,
          showCloseButton: true,
          allowOutsideClick: false,
          text: String(e),
          icon: "error",
          customClass: {
            container: "body",
          },

          confirmButtonText: "Aceptar",
        });
      }
    }
  },
};
