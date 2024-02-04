import { Resource, resources } from "@/services";

export type Keys<R extends Resource> = {
  all: [R];
  lists: [...Keys<R>["all"], "list"];
  list: [...Keys<R>["lists"], any];
  details: [...Keys<R>["all"], "detail"];
  detail: [...Keys<R>["details"], number];
};

export type KeyMap = { [R in Resource]: Keys<R> } & {};

const getKeys = <R extends Resource>(resource: R) => {
  const keys = {
    all: [resource] as const,
    lists: () => [...keys.all, "list"] as const,
    list: (filters: string) => [...keys.lists(), { filters }] as const,
    details: () => [...keys.all, "detail"] as const,
    detail: (id: number) => [...keys.details(), id] as const,
  };
  return keys;
};

export const keys: KeyMap = resources.reduce((obj, r) => {
  return { ...obj, [r]: getKeys(r) };
}, {} as KeyMap);
