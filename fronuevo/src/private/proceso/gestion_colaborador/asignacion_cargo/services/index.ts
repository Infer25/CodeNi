import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import {
  ModelApiBackendCargoEmpleado,
  ModelFrmHistorialCargoFormulario,
  ModelGetArea,
  ModelGetCargoFiltroArea,
} from "@/shared/zustand/slice/proceso/gestion_colaborador/frmAsignacionCargo";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import {
  AdapterGetAllArea,
  AdapterGetAllCargoArea,
  AdapterGetAllColaborador,
} from "../adapter";

export const ServicesCargoColaborador = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.CargoColaborador}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetAllColaborador(
      (await Api.get<ModelApiBackendCargoEmpleado>(query)).data
    );

    return valor;
  },
  create: async (data_: ModelFrmHistorialCargoFormulario) => {
    const { num_colaborador,num_cargo ,descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.CargoColaborador}/create/`, {
        num_colaborador: num_colaborador,
        num_cargo: num_cargo,
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
  getAllArea: async function () {
    const query = `${Rutas.CargoColaborador}/getAllArea`;
    const valor = AdapterGetAllArea(
      (await Api.get<ModelGetArea[]>(query)).data
    );
    return valor;
  },

  getAllCargoArea: async function (id: number) {
    const query = `${Rutas.CargoColaborador}/getAllCargoArea/${id}`;
    const valor = AdapterGetAllCargoArea(
      (await Api.get<ModelGetCargoFiltroArea[]>(query)).data
    );
    return valor;
  },
};
