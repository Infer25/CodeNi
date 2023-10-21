import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import {
  ModelFrmrol_modulo_Formulario,
  ModelGetModulo,
} from "@/shared/zustand/slice/frm_rol_modulo";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetOnlyModulo } from "../adaptador";

export const Services_tbl_rol_modulo = {
  create: async (data_: ModelFrmrol_modulo_Formulario) => {
    const { num_rol, list_modulo } = data_;

    try {
      const { data } = await Api.post(`${Rutas.tbl_rol_modulo}/create/`, {
        num_rol: num_rol,

        list_modulo: list_modulo,
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

  getAllModulo: async function () {
    const query = `${Rutas.tbl_rol_modulo}/get`;
    const valor = AdapterGetOnlyModulo(
      (await Api.get<ModelGetModulo[]>(query)).data
    );
    return valor;
  },
};
