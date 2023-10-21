import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";
import { ModelFrmActualizarRegionPais } from "@/shared/zustand/slice/frmRegionPais";
import { ModelApiBackendTipoRubro, ModelFrmTipoRubroFormulario } from "@/shared/zustand/slice/frmTipoRubro";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetAllTipoRubro } from "../adapter";


export const CatTipoRubro = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.catTipoRubro}/getAll/${criterio == "" ? "_" : criterio}&&${
      filtro == "" ? " " : filtro
    }&&${pagina}&&${cantidadFila}`;
    const valor = AdapterGetAllTipoRubro(
      (await Api.get<ModelApiBackendTipoRubro>(query)).data
    );
    return valor;
  },

  create: async (data_: ModelFrmTipoRubroFormulario) => {
    const { nombre, descripcion } = data_;

    try {
      const { data } = await Api.post(`${Rutas.catTipoRubro}/create/`, {
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
  update: async function (obj: ModelFrmActualizarRegionPais) {
    try {
      const query = `${Rutas.catTipoRubro}/update/${obj.id}`;
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
