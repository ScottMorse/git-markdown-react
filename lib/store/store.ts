import createStore from "zustand";
import { GarkdownThemeName } from "@/lib/styles/theme";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ColorMode } from "theme-ui";

interface GarkdownStore {
  theme: GarkdownThemeName;
  colorMode: "light" | "dark";
}

export const useGarkdownStore = createStore<GarkdownStore>()(
  persist(
    devtools(
      immer((set) => ({
        theme: "base",
        colorMode: "dark",
      }))
    )
  )
);
