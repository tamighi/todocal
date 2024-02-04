import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useQuery } from "@tanstack/react-query";

type ServiceGetManyFns<T extends keyof typeof serviceMap> =
  (typeof serviceMap)[T]["getMany"];

export const useGetMany = <R extends Resource>(
  resource: R,
  query?: Parameters<ServiceGetManyFns<R>>[0],
) => {
  const queryResult = useQuery<ResourceTypes[R][], Error, ResourceTypes[R][]>({
    queryKey: [resource, query],
    //@ts-expect-error Idk how to match the fn to it's argument
    queryFn: () => serviceMap[resource].getMany(query),
  });

  return queryResult;
};
