import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetOne = <R extends Resource>(resource: R, id: string) => {
  const queryResult = useQuery<ResourceTypes[R]>({
    queryKey: [resource, id],
    queryFn: (() => serviceMap[resource].getOne(id)) as () => Promise<
      ResourceTypes[R]
    >,
  });

  return queryResult;
};
