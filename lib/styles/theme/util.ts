import { merge } from "@/lib/util/merge";
import { DeeplyPartial } from "@/lib/util/types";
import { BASE_THEME } from "./base";
import { Theme } from "theme-ui";

export const createTheme = (themeOptions: DeeplyPartial<Theme>) =>
  merge(BASE_THEME, themeOptions);
