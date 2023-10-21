import { Rutas } from "@/shared/environment";
import { ModelBackendGetComboBox } from "@/shared/models";
import { Api } from "@/shared/services";
import {
  ModelApiBackendRubro,
  ModelFrmActualizarRubro,
  ModelFrmRubroFormulario,
} from "@/shared/zustand/slice/frmRubro";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllRubro, AdapterGetAllTipoRubro } from "../adapter";

export const RubroServices = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catRubro}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllRubro(
      (await Api.get<ModelApiBackendRubro>(query)).data
    );
    return valor;
  },

  create: async (data_: ModelFrmRubroFormulario) => {
    const { num_tipo_rubro, nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catRubro}/create/`, {
        nombre: nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        registrado_por: 1,
        num_tipo_rubro: num_tipo_rubro,
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

  getAllTipoRubro: async function () {
    const query = `${Rutas.catRubro}/get/`;

    const valor = AdapterGetAllTipoRubro(
      (await Api.get<ModelBackendGetComboBox[]>(query)).data
    );
    return valor;
  },

  update: async function (obj: ModelFrmActualizarRubro) {
    try {
      const query = `${Rutas.catRubro}/update/${obj.id}`;
      const valor = await Api.put(query, {
        num_tipo_rubro: obj.num_tipo_rubro,
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
