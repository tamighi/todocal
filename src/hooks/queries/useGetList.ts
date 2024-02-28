import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useQuery } from "@tanstack/react-query";

type ServiceGetListFns<T extends keyof typeof serviceMap> =
  (typeof serviceMap)[T]["getList"];

export const useGetList = <R extends Resource>(
  resource: R,
  query?: Parameters<ServiceGetListFns<R>>[0],
) => {
  const queryResult = useQuery<ResourceTypes[R][], Error, ResourceTypes[R][]>({
    queryKey: [resource, "list", query],
    //@ts-expect-error Idk how to match the fn to it's argument
    queryFn: () => serviceMap[resource].getList(query),
  });

  return queryResult;
};
