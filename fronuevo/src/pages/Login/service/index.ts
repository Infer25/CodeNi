import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import { ModelLogin, ModelLoginFrotend } from "@/shared/zustand/slice/frmLogin";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterLogin } from "../adapter";

export const ServicesLogin = {
  auth: async function (data: ModelLoginFrotend) {
    
    try {
      const query = `${Rutas.catusuario}/auth`;
      const valor = AdapterLogin(
        (
          await Api.post<ModelLogin>(query, {
            usuario: data.usuario,
            pass: data.pass,
          })
        ).data
      );
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
