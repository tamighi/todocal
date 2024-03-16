import { Resource, ResourceType, serviceMap } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetOne = <R extends Resource>(resource: R, id: string) => {
  const queryResult = useQuery<ResourceType<R>>({
    queryKey: [resource, "detail", id],
    queryFn: (() => serviceMap[resource].getOne(id)) as () => Promise<
      ResourceType<R>
    >,
  });

  return queryResult;
};
