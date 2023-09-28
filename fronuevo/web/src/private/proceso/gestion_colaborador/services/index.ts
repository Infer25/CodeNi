import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import {
  ModelApiBackendPersonaModelApiBackendPersona,
  ModelBackendGetCBX,
  ModelFrmPersona,
} from "@/shared/zustand/slice/proceso/gestion_colaborador";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllCbx, AdapterGetAllPersona } from "../adapter";
import { formatoFecha } from "@/shared/utils";

export const ServicesPersona = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.persona}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllPersona(
      (await Api.get<ModelApiBackendPersonaModelApiBackendPersona>(query)).data
    );
    return valor;
  },

  getAllMunicipio: async function () {
    const query = `${Rutas.persona}/get/`;

    const valor = AdapterGetAllCbx(
      (await Api.get<ModelBackendGetCBX[]>(query)).data
    );
    return valor;
  },

  getAllTipoIdentificacion: async function () {
    const query = `${Rutas.persona}/getTipo/`;

    const valor = AdapterGetAllCbx(
      (await Api.get<ModelBackendGetCBX[]>(query)).data
    );
    return valor;
  },

  create: async (data_: ModelFrmPersona) => {
    const {
      fechanac_fechaconstitucion,
      origen,
      nombre,
      apellido_razonsocial,
      movil,
      email,
      direccion,
      identificacio,
    } = data_;

    try {
      const { data } = await Api.post(`${Rutas.persona}/create/`, {
        fechanac_fechaconstitucion: formatoFecha(
          fechanac_fechaconstitucion.toString()
        ),
        origen,
        nombre,
        apellido_razonsocial,
        movil,
        email,
        direccion,
        registrado_por: 1,
        identificacio: identificacio,
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
};
