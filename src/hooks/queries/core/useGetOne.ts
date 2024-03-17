import { useQuery } from "@tanstack/react-query";

import { Resource, ResourceType, serviceMap } from "@/services";

export const useGetOne = <R extends Resource>(resource: R, id: string) => {
  const queryResult = useQuery<ResourceType<R>>({
    queryKey: [resource, "detail", id],
    queryFn: (() => serviceMap[resource].getOne(id)) as () => Promise<
      ResourceType<R>
    >,
  });

  return queryResult;
};
