import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import {
  ModelApiBackendDptoRegion,
  ModelBackendGetRegion,
  ModelFrmActualizarDptoRegion,
  ModelFrmDptoRegionFormulario
} from "@/shared/zustand/slice/frmDptoRegion";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import {
  AdapterGetAllDptoRegion,
  AdapterGetAllRegionPais,
} from "../listar/adapter";

export const dptoRegion = {
  getAllDptoRegion: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catDepartamentoRegion}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllDptoRegion(
      (await Api.get<ModelApiBackendDptoRegion>(query)).data
    );
    return valor;
  },

  createDptoRegion: async (data_: ModelFrmDptoRegionFormulario) => {
    const { num_region, nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catDepartamentoRegion}/create/`, {
        nombre: nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        registrado_por: 1,
        num_region_pais: num_region,
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

  getAllRegion: async function () {
    const query = `${Rutas.catDepartamentoRegion}/get/`;

    const valor = AdapterGetAllRegionPais(
      (await Api.get<ModelBackendGetRegion[]>(query)).data
    );
   console.log(valor)
    return valor;
  },

  updateDptoRegion: async function (obj: ModelFrmActualizarDptoRegion) {
    try {
      const query = `${Rutas.catDepartamentoRegion}/update/${obj.id}`;
      const valor = await Api.put(query, {
        num_region_pais: obj.num_region,
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
