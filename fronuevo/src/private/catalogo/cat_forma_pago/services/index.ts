import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import "@/shared/theme/Alert.css";

import Swal from "sweetalert2";


import { AxiosError } from "axios";
import { AdapterGetAllforma_pago } from "../adaptador";
import { ModelApiBackendforma_pago, ModelFrmforma_pagoFormulario } from "@/shared/zustand/slice/frmCatFormaPago";

export const Servicesforma_pago = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.formapago }/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetAllforma_pago (
      (await Api.get<ModelApiBackendforma_pago >(query)).data
    ); 
    return valor;
  },

  create: async (data_: ModelFrmforma_pagoFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.formapago }/create/`, {
        nombre_forma_pago : nombre.toLowerCase(),
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
  update: async function (obj: ModelFrmforma_pagoFormulario) {
    try {
      const query = `${Rutas.formapago }/update/${obj.num_forma_pago }`;
      const valor = await Api.put(query, {
        nombre_forma_pago : obj.nombre.toLowerCase(),
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
