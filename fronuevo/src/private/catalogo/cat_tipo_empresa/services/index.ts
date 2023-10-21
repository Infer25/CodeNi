import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import "@/shared/theme/Alert.css";

import Swal from "sweetalert2";


import { AxiosError } from "axios";
import { ModelApiBackendtipo_empresa, ModelFrmtipo_empresaFormulario } from "@/shared/zustand/slice/frmCatTipoEmpresa";
import { AdapterGetAlltipo_empresa } from "../adaptador";

export const Servicestipo_empresa = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.cattipoempresa}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetAlltipo_empresa (
      (await Api.get<ModelApiBackendtipo_empresa >(query)).data
    ); 
    return valor;
  },

  create: async (data_: ModelFrmtipo_empresaFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.cattipoempresa }/create/`, {
        nombre_tipo_empresa : nombre.toLowerCase(),
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
  update: async function (obj: ModelFrmtipo_empresaFormulario) {
    try {
      const query = `${Rutas.cattipoempresa }/update/${obj.num_tipo_empresa }`;
      const valor = await Api.put(query, {
        nombre_tipo_empresa : obj.nombre.toLowerCase(),
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
