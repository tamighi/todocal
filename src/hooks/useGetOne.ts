import React from "react";

import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOne = <R extends Resource>(resource: R, id: string) => {
  const queryClient = useQueryClient();

  const initialData = React.useCallback(() => {
    const data = queryClient.getQueryData<ResourceTypes[R][]>([resource]);

    const initialData = data?.find((item) => item.id === id);
    return initialData;
  }, []);

  const queryResult = useQuery<ResourceTypes[R]>({
    queryKey: [resource, id],
    queryFn: (() => serviceMap[resource].getOne(id)) as () => Promise<
      ResourceTypes[R]
    >,
    initialData,
  });

  return queryResult;
};
