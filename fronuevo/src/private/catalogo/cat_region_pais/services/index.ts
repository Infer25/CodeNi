import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import { ModelApiBackendRegionPais, ModelFrmActualizarRegionPais, ModelFrmRegionPaisFormulario } from "@/shared/zustand/slice/frmRegionPais";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllRegionPais } from "../listar/adapter";

export const regionPais = {
  getAllRegionPais: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catRegionPais}/getAll/${criterio == "" ? "_" : criterio}&&${
      filtro == "" ? " " : filtro
    }&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllRegionPais(
      (await Api.get<ModelApiBackendRegionPais>(query)).data
    );
    return valor;
  },

  createRegionPais: async (data_: ModelFrmRegionPaisFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catRegionPais}/create/`, {
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
  updateRegionPais: async function (obj: ModelFrmActualizarRegionPais) {
    try {
      const query = `${Rutas.catRegionPais}/update/${obj.id}`;
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
