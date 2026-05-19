export const interpolate = (
  text: string,
  params?: Record<string, string | number>,
): string => {
  if (!params) return text;
  return Object.entries(params).reduce(
    (result, [key, value]) =>
      result.replaceAll(`{{${key}}}`, String(value)),
    text,
  );
};
