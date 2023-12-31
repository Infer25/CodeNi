import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import {
  ModelApiBackendColor,
  ModelFrmColorFormulario,
} from "@/shared/zustand/slice/frmColor";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllColor } from "../adapter";

export const ServicescatColor = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catColor}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllColor(
      (await Api.get<ModelApiBackendColor>(query)).data
    );
    return valor;
  },

  create: async (data_: ModelFrmColorFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catColor}/create/`, {
        nombre: nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        registrado_por: 1,
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
  update: async function (obj: ModelFrmColorFormulario) {
    try {
      const query = `${Rutas.catColor}/update/${obj.num_color}`;
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
