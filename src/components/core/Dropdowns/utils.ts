type StringKey<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

export type PropertyKey<T> = T extends object ? StringKey<T> : never;

export const getProperty = <T extends object | string>(
  value: T,
  propertyKey: PropertyKey<T> | undefined,
): string => {
  if (!value || (propertyKey && !value[propertyKey])) return "";
  return propertyKey ? (value[propertyKey] as string) : (value as string);
};
