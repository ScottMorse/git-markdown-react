import { BASE_THEME } from "./base";

export const THEMES = {
  base: BASE_THEME,
} as const;

export type GarkdownThemeName = keyof typeof THEMES;
