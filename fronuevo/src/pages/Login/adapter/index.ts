import { ModelLogin, ModelLoginFrotend } from "@/shared/zustand/slice/frmLogin";

export const AdapterLogin = (obj: ModelLogin): ModelLoginFrotend => {
  return {
    usuario: obj.usuario,
    pass: obj.pass,
    token:obj.token,
    num_colaborador:obj.num_colaborador
  };
};
