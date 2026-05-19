import type { StringKey } from "../../../constants/strings";

export type BoardTheme = {
  nameKey: StringKey;
  light: string;
  dark: string;
};

export const BOARD_THEMES: BoardTheme[] = [
  { nameKey: "theme_classic", light: "#EEEED2", dark: "#769656" },
  { nameKey: "theme_brown", light: "#F0D9B5", dark: "#B58863" },
  { nameKey: "theme_blue", light: "#D5E5F5", dark: "#4A7BA7" },
  { nameKey: "theme_gray", light: "#E0E0E0", dark: "#808080" },
  { nameKey: "theme_red", light: "#F5D5D5", dark: "#C75050" },
  { nameKey: "theme_green", light: "#D4E8D4", dark: "#5A8A5A" },
];
