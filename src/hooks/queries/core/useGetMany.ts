import { useQuery } from "@tanstack/react-query";

import { Resource, ResourceType, serviceMap } from "@/services";

type ServiceGetManyFns<T extends keyof typeof serviceMap> =
  (typeof serviceMap)[T]["getMany"];

export const useGetMany = <R extends Resource>(
  resource: R,
  ...query: Parameters<ServiceGetManyFns<R>>
) => {
  const queryResult = useQuery<ResourceType<R>[], Error, ResourceType<R>[]>({
    queryKey: [resource, "list", query],
    //@ts-expect-error ...
    queryFn: () => serviceMap[resource].getMany(...query),
  });

  return queryResult;
};
