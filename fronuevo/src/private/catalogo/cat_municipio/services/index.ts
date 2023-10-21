import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import { ModelApiBackendMunicipio, ModelBackendGetDepartamento, ModelFrmActualizarMunicipio, ModelFrmMunicipioFormulario } from "@/shared/zustand/slice/frmMunicipio";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import {
  AdapterGetAllDepartamento,
  AdapterGetAllMunicipio
} from "../listar/adapter";

export const MunicipioServices = {
  getAllMunicipio: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catMunicipio}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllMunicipio(
      (await Api.get<ModelApiBackendMunicipio>(query)).data
    );
    return valor;
  },

  createMunicipio: async (data_: ModelFrmMunicipioFormulario) => {
    const { num_departamento, nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catMunicipio}/create/`, {
        nombre: nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        registrado_por: 1,
        num_departamento_region: num_departamento,
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

  getAllDepartamento: async function () {
    const query = `${Rutas.catMunicipio}/get/`;

    const valor = AdapterGetAllDepartamento(
      (await Api.get<ModelBackendGetDepartamento[]>(query)).data
    );
    return valor;
  },

  updateMunicipio: async function (obj: ModelFrmActualizarMunicipio) {
    try {
      const query = `${Rutas.catMunicipio}/update/${obj.id}`;
      const valor = await Api.put(query, {

        num_departamento_region: obj.num_departamento,
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
