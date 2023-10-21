import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import { useAuth } from "@/shared/zustand/slice/Auth";
import { ModelApiBackendEmpleadoBase } from "@/shared/zustand/slice/Colaborador_Base";
import { Cat_usuario, ModelGetRol } from "@/shared/zustand/slice/frmCatUsuario";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllColaborador, AdapterGetOnlyrol } from "../adapter";

export const Servicescatusuario = {
  getAllColaboradorUsuario: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catusuario}/getAllColaborador/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetAllColaborador(
      (await Api.get<ModelApiBackendEmpleadoBase>(query)).data
    );

    return valor;
  },

  getAllrol: async function () {
    const query = `${Rutas.catusuario}/getRol`;
    const valor = AdapterGetOnlyrol((await Api.get<ModelGetRol[]>(query)).data);
    return valor;
  },
  create: async (data_: Cat_usuario) => {
    const { num_colaborador, usuario, pass, list_rol } = data_;
   const registrado_por = useAuth.getState().num_colaborador;
    
    try {
      const { data } = await Api.post(`${Rutas.catusuario}/create/`, {
        num_colaborador,
        usuario,
        pass,
        list_rol,
        registrado_por: registrado_por,
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
