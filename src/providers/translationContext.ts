import { createContext } from "react";
import type { StringKey, UiLang } from "../constants/strings";

export type TranslateParams = Record<string, string | number>;

export type TranslationContextValue = {
  t: (key: StringKey, params?: TranslateParams) => string;
  lang: UiLang;
  setLang: (lang: UiLang) => void;
  loading: boolean;
};

export const TranslationContext =
  createContext<TranslationContextValue | null>(null);
