import { baseStrings, type StringKey } from "../constants/strings";

export const buildLocale = (
  partial: Partial<Record<StringKey, string>>,
): Record<StringKey, string> => ({
  ...baseStrings,
  ...partial,
});
