import { StateCreator } from "zustand";

export interface ThemeSlice {
  theme: boolean;
  chsngeState: () => void;
}
export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: true,
  chsngeState: () => set((state) => ({ theme: !state.theme })),
});
