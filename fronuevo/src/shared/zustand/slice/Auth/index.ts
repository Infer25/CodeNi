import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ModelAuth {
  token: string;
  num_colaborador: string;
  setToken: (token: string) => void;
  setNumColaborador: (id: string) => void;
}

export const useAuth = create(
  persist<ModelAuth>(
    (set) => ({
      token: "",
      num_colaborador: "",

      setToken: (token: string) =>
        set((state) => ({
          token: (state.token = token),
        })),

      setNumColaborador: (id: string) =>
        set((state) => ({
          num_colaborador: (state.num_colaborador = id),
        })),
        
    }),

    {
      name: "auth",
    }
  )
);
