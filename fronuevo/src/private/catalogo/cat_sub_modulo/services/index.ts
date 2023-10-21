import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import "@/shared/theme/Alert.css";

import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllsub_modulo, AdapterGetOnlyModulo } from "../adaptador";
import {
  ModelApiBackendsub_modulo,
  ModelFrmsub_moduloFormulario,
  ModelGetmodulo,
} from "@/shared/zustand/slice/frmCatSubModulo";

export const Servicescatsub_modulo = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catsubmodulo}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetAllsub_modulo(
      (await Api.get<ModelApiBackendsub_modulo>(query)).data
    );
    console.log(valor);
    return valor;
  },

  create: async (data_: ModelFrmsub_moduloFormulario) => {
    const { num_modulo, ruta, nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catsubmodulo}/create/`, {
        num_modulo: num_modulo,
        nombre_sub_modulo: nombre.toLowerCase(),
        ruta: ruta.toLowerCase(),
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
  update: async function (obj: ModelFrmsub_moduloFormulario) {
    try {
      const query = `${Rutas.catsubmodulo}/update/${obj.num_sub_modulo}`;
      const valor = await Api.put(query, {
        nombre_sub_modulo: obj.nombre.toLowerCase(),
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

  getAllOnly_modulo: async function () {
    const query = `${Rutas.catsubmodulo}/getAllModulo`;
    const valor = AdapterGetOnlyModulo(
      (await Api.get<ModelGetmodulo[]>(query)).data
    );
    return valor;
  },
};
