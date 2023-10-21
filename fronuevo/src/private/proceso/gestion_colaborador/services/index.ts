import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import {
  ModelApiBackendPersonaModelApiBackendPersona,
  ModelBackendGetCBX,
  ModelBackendGetTipoColaborador,
} from "@/shared/zustand/slice/proceso/gestion_colaborador";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import {
  AdapterGetAllCbx,
  AdapterGetAllCbxTipoColaborador,
  AdapterGetAllPersona,
} from "../adapter";

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
  getAllestadoCivil: async function () {
    const query = `${Rutas.persona}/get/EstadoCivil`;

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

  create: async (data_: FormData) => {

    try {
      const { data } = await Api.post(`${Rutas.persona}/create/`, data_, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
  getAllTipoColaborador: async function () {
    const query = `${Rutas.persona}/get/TipoColaborador`;
    const valor = AdapterGetAllCbxTipoColaborador(
      (await Api.get<ModelBackendGetTipoColaborador[]>(query)).data
    );
    return valor;
  },
  
};

/*
onst { data } = await Api.post(`${Rutas.persona}/create/`, data_, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      const { data } = await Api.post(`${Rutas.persona}/create/`, {
        fechanac_fechaconstitucion: data_.get("fechanac_fechaconstitucion"),
        origen: data_.get("origen"),
        nombre: data_.get("nombre"),
        apellido_razonsocial: data_.get("apellido_razonsocial"),
        movil: data_.get("movil"),
        email: data_.get("email"),
        direccion: data_.get("direccion"),
        registrado_por: 1,
        identificacio: objeto,
        imagen: data_.get("imagen"),
      });
*/
