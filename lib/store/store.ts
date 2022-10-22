import createStore from "zustand";
import { GarkdownThemeName } from "@/lib/styles/theme";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface GarkdownStore {
  theme: GarkdownThemeName;
}

export const useGarkdownStore = createStore<GarkdownStore>()(
  persist(
    devtools(
      immer((set) => ({
        theme: "base",
      }))
    )
  )
);
