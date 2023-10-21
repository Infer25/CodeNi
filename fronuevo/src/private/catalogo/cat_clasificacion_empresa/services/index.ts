import { Rutas } from "@/shared/environment";
import { ModelApiBackendclasificacion_empresa, ModelFrmclasificacion_empresaFormulario } from "@/shared/zustand/slice/frmCatClasificacionEmpresa";

import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllclasificacion_empresa } from "../adaptador";
import "@/shared/theme/Alert.css";
import { Api } from "@/shared/services";
export const Servicesclasificacion_empresa = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catclasificacionempresa }/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetAllclasificacion_empresa (
      (await Api.get<ModelApiBackendclasificacion_empresa >(query)).data
    ); 
    return valor;
  },

  create: async (data_: ModelFrmclasificacion_empresaFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catclasificacionempresa }/create/`, {
        nombre_clasificacion_empresa : nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        registrado_por: 1,
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
  update: async function (obj: ModelFrmclasificacion_empresaFormulario) {
    try {
      const query = `${Rutas.catclasificacionempresa }/update/${obj.num_clasificacion_empresa }`;
      const valor = await Api.put(query, {
        nombre_clasificacion_empresa : obj.nombre.toLowerCase(),
        descripcion: obj.descripcion.toLowerCase(),
      });
      if (valor.data == "OK") {
        Swal.fire({
          text: "Actualizacion completa",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }

      return valor;
    } catch (e) {
      if (e instanceof AxiosError) {
        Swal.fire({
          text: e.request.response,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          text: String(e),
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  },
};
