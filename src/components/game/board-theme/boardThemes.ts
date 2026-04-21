export type BoardTheme = {
  name: string;
  light: string;
  dark: string;
};

export const BOARD_THEMES: BoardTheme[] = [
  { name: "Classic", light: "#EEEED2", dark: "#769656" },
  { name: "Brown", light: "#F0D9B5", dark: "#B58863" },
  { name: "Blue", light: "#D5E5F5", dark: "#4A7BA7" },
  { name: "Gray", light: "#E0E0E0", dark: "#808080" },
  { name: "Red", light: "#F5D5D5", dark: "#C75050" },
  { name: "Green", light: "#D4E8D4", dark: "#5A8A5A" },
];
