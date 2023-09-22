import { StateCreator } from "zustand";

export interface MenuSlice {
  stateMenu: boolean;
  chsngeStateMenu: () => void;
}
export const createMenuSlice: StateCreator<MenuSlice> = (set) => ({
    stateMenu: true,
    chsngeStateMenu: () => set((state) => ({ stateMenu: !state.stateMenu })),
});
