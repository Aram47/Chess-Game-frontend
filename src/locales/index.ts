import { baseStrings, type StringKey, type UiLang } from "../constants/strings";
import { ru } from "./ru";
import { am } from "./am";

export const locales: Record<UiLang, Record<StringKey, string>> = {
  en: { ...baseStrings },
  ru,
  am,
};
