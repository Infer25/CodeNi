import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import "@/shared/theme/Alert.css";
import { ModelApiBackendmodulo, ModelFrmmoduloFormulario } from "@/shared/zustand/slice/frmModulo";

import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllmodulo } from "../adaptador";

export const Servicescatmodulo = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catmodulo}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetAllmodulo(
      (await Api.get<ModelApiBackendmodulo>(query)).data
    ); 
    console.log(valor)
    return valor;
  },

  create: async (data_: ModelFrmmoduloFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catmodulo}/create/`, {
        nombre_modulo: nombre.toLowerCase(),
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
  update: async function (obj: ModelFrmmoduloFormulario) {
    try {
      const query = `${Rutas.catmodulo}/update/${obj.num_modulo}`;
      const valor = await Api.put(query, {
        nombre_modulo: obj.nombre.toLowerCase(),
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
