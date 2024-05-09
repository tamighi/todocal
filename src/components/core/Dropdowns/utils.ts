type StringKey<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

export type LabelKey<T> = T extends object ? StringKey<T> : never;

export const getLabel = <T extends object | string>(
  value: T,
  labelKey: LabelKey<T> | undefined,
): string => {
  if (!value || (labelKey && !value[labelKey])) return "";
  return labelKey ? (value[labelKey] as string) : (value as string);
};
