import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";

import {
  Departamento,
  ModelFrmrol_Tbl_rubro_coordenada_Crear,
  ModelMapGetTbl_rubro_coordenada_Backend_Backend,
  Rubro,
} from "@/shared/zustand/slice/Rubro_Coordenada";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AdapterGetRubroCoordenada } from "../adaptador";
import "./Alert.css";
import { useAuth } from "@/shared/zustand/slice/Auth";

export const ServicesRubroCoordenada = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.RubroCoordenada}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetRubroCoordenada(
      (await Api.get<ModelMapGetTbl_rubro_coordenada_Backend_Backend>(query))
        .data
    );
    console.log(valor);
    return valor;
  },
  getAllDepartamento: async function () {
    const query = `${Rutas.RubroCoordenada}/getDepartamento`;
    const valor = (await Api.get<Departamento[]>(query)).data;
    console.log(valor)
    return valor;
  },
  getAllRubro: async function () {
    const query = `${Rutas.RubroCoordenada}/getRubro`;
    const valor = (await Api.get<Rubro[]>(query)).data;
    return valor;
  },
  create: async (data_: ModelFrmrol_Tbl_rubro_coordenada_Crear) => {
    const { num_rubro, num_departamento,longitid,latitud } = data_;
    const registrado_por = useAuth.getState().num_colaborador;
    try {
      const { data } = await Api.post(`${Rutas.RubroCoordenada}/create/`, {
        num_rubro: num_rubro,
        num_departamento_region: num_departamento,
        longitud: longitid,
        latitud:latitud,
        registrado_por:registrado_por
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
        alert(e.message =='Request failed with status code 300')
     
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
  update: async function (obj: ModelFrmrol_Tbl_rubro_coordenada_Crear) {
    try {
      const query = `${Rutas.RubroCoordenada}/update/${obj.num_rubro_coordenada}`;
      const valor = await Api.put(query, {
        num_rubro: obj.num_rubro,
        num_departamento_region: obj.num_departamento,
        latitud: obj.latitud,
        longitud: obj.longitid
        
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
