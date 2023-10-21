import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import { AdapterGetAll } from "../adapter";
import { ModelBackendEstado_ } from "@/shared/zustand/slice/frmEstado";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { ModelFrmEstadoFormulario } from "../../crear/model";
import { ModeFrmActualizarEstado } from "../../actualizar/model";
import { useAuth } from "@/shared/zustand/slice/Auth";

export const State = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.estado}/getAll/${criterio == "" ? "_" : criterio}&&${
      filtro == "" ? " " : filtro
    }&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAll(
      (await Api.get<ModelBackendEstado_>(query)).data
    );
    return valor;
  },

  createState: async (data_: ModelFrmEstadoFormulario) => {
    const { nombre, descripcion } = data_;
    const num_colaborador = useAuth.getState().num_colaborador;
    try {
      const { data } = await Api.post(`${Rutas.estado}/create/`, {
        nombre: nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        registrado_por: num_colaborador,
      });
      if (data) {
        Swal.fire({
          customClass: {
            container: "",
          },
          text: "Registro exitoso",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
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
  updateState: async function (state: ModeFrmActualizarEstado) {
    try {
      const query = `${Rutas.estado}/update/${state.numestado}`;
      const valor = await Api.put(query, {
        nombre: state.nombreestado.toLowerCase(),
        descripcion: state.descripcion.toLowerCase(),
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
