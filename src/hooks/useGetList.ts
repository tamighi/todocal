import { Resource, serviceMap } from "@/services";
import { useQuery } from "@tanstack/react-query";

type ServiceGetListFns = {
  [K in keyof typeof serviceMap]: (typeof serviceMap)[K]["getList"];
};

export const useGetList = <R extends Resource>(
  resource: R,
  query?: Parameters<ServiceGetListFns[R]>[0],
) => {
  const queryResult = useQuery({
    queryKey: [resource, query],
    //@ts-expect-error Idk how to match the fn to it's argument
    queryFn: () => serviceMap[resource].getList(query),
  });

  return queryResult;
};
