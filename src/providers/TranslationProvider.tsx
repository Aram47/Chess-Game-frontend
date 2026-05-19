import { useState, useCallback, useMemo, type ReactNode } from "react";
import { baseStrings, type StringKey, type UiLang } from "../constants/strings";
import { locales } from "../locales";
import { interpolate } from "../utils/translate";
import {
  TranslationContext,
  type TranslationContextValue,
  type TranslateParams,
} from "./translationContext";

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<UiLang>("en");

  const translations = locales[lang];

  const t = useCallback(
    (key: StringKey, params?: TranslateParams) =>
      interpolate(translations[key] ?? baseStrings[key] ?? key, params),
    [translations],
  );

  const value = useMemo<TranslationContextValue>(
    () => ({ t, lang, setLang, loading: false }),
    [t, lang],
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
