import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import {
  ModelApiBackendTipocolaborador,
  ModelFrmTipocolaboradorFormulario,
} from "@/shared/zustand/slice/frmTipoColaborador";
import "./Alert.css";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllTipocolaborador } from "../adaptador";

export const ServicescatTipoColaborador = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catTipoColaborador}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllTipocolaborador(
      (await Api.get<ModelApiBackendTipocolaborador>(query)).data
    );
    return valor;
  },

  create: async (data_: ModelFrmTipocolaboradorFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catTipoColaborador}/create/`, {
        nombre: nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        registrado_por: 1,
      });
      if (data) {
        Swal.fire({
          allowOutsideClick:false,
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
  update: async function (obj: ModelFrmTipocolaboradorFormulario) {
    try {
      const query = `${Rutas.catTipoColaborador}/update/${obj.num_tipo_colaborador}`;
      const valor = await Api.put(query, {
        nombre: obj.nombre.toLowerCase(),
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
