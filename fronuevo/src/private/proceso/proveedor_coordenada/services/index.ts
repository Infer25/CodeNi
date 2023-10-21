import { Rutas } from "@/shared/environment";
import { Api } from "@/shared/services";


import { ModelApiBackendProveedorCoordenadaBackend } from "@/shared/zustand/slice/proveedor_ubicacion";
import { AdapterGetProveedorCoordenada } from "../adaptador";
import "./Alert.css";

export const ServicesProveedorCoordenada = {
  getAll: async function (
    criterio: string,
    filtro: string,
    pagina: number,
    cantidadFila: number
  ) {
    const query = `${Rutas.ProveedorCoordenada}/getAll/${
      criterio == "" ? "_" : criterio
    }&&${filtro == "" ? " " : filtro}&&${pagina}&&${cantidadFila}`;

    const valor = AdapterGetProveedorCoordenada(
      (await Api.get<ModelApiBackendProveedorCoordenadaBackend>(query)).data
    );
    console.log(valor);
    return valor;
  },
};
