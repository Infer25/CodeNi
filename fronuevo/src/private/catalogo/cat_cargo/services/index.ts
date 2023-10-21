import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import "@/shared/theme/Alert.css";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import {
  ModelApiBackendcargo,
  ModelFrmcargoFormulario,
  ModelGetArea,
} from "@/shared/zustand/slice/frmCatCargo";
import { AdapterGetAllArea, AdapterGetAllcargo } from "../adaptador";

export const Servicescatcargo = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catcargo}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetAllcargo(
      (await Api.get<ModelApiBackendcargo>(query)).data
    );
    console.log(valor);
    return valor;
  },

  create: async (data_: ModelFrmcargoFormulario) => {
    const { num_area,nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catcargo}/create/`, {
        num_area:num_area,
        nombre: nombre.toLowerCase(),
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
  update: async function (obj: ModelFrmcargoFormulario) {
    try {
      const query = `${Rutas.catcargo}/update/${obj.num_cargo}`;
      const valor = await Api.put(query, {
        num_area:obj.num_area,
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
  getAllArea: async function () {
    const query = `${Rutas.catcargo}/get`;
    const valor = AdapterGetAllArea(
      (await Api.get<ModelGetArea[]>(query)).data
    );
    return valor;
  },
};
