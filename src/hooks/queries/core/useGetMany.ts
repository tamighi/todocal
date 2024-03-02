import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useQuery } from "@tanstack/react-query";

type ServiceGetManyFns<T extends keyof typeof serviceMap> =
  (typeof serviceMap)[T]["getMany"];

export const useGetMany = <R extends Resource>(
  resource: R,
  ...query: Parameters<ServiceGetManyFns<R>>
) => {
  const queryResult = useQuery<ResourceTypes[R][], Error, ResourceTypes[R][]>({
    queryKey: [resource, "list", query],
    //@ts-expect-error ...
    queryFn: () => serviceMap[resource].getMany(...query),
  });

  return queryResult;
};
