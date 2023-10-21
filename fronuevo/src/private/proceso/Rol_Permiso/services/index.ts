import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import {
  ModelFrmrol_permiso_Formulario,
  ModelGetpermiso,
} from "@/shared/zustand/slice/frm_rol_permiso";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetOnlypermiso } from "../adaptador";

export const Services_tbl_rol_permiso = {
  create: async (data_: ModelFrmrol_permiso_Formulario) => {
    const { num_rol, list_permiso } = data_;

    try {
      const { data } = await Api.post(`${Rutas.tbl_rol_permiso}/create/`, {
        num_rol: num_rol,
        list_permiso: list_permiso,
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

  getAllpermiso: async function () {
    const query = `${Rutas.tbl_rol_permiso}/get`;
    const valor = AdapterGetOnlypermiso(
      (await Api.get<ModelGetpermiso[]>(query)).data
    );
    return valor;
  },
};
