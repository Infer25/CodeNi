import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import { ModelApiBackendCualidad, ModelFrmCualidadFormulario } from "@/shared/zustand/slice/frmCualidad";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllCualidad } from "../adapter";

export const ServicesCatCualidad = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catCualidad}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllCualidad(
      (await Api.get<ModelApiBackendCualidad>(query)).data
    );
    return valor;
  },

  create: async (data_: ModelFrmCualidadFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catCualidad}/create/`, {
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
  update: async function (obj: ModelFrmCualidadFormulario) {
    try {
      const query = `${Rutas.catCualidad}/update/${obj.num_cualidad}`;
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
