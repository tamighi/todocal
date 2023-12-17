import { dayService, monthService, todoService } from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const serviceMap = {
  todo: todoService,
  day: dayService,
  month: monthService,
} as const;

type Resource = keyof typeof serviceMap;

type ResourceTypes = {
  [K in keyof typeof serviceMap]: Awaited<
    ReturnType<(typeof serviceMap)[K]["getOne"]>
  >;
};

export const useGetOne = <R extends Resource>(resource: R, id: string) => {
  const queryClient = useQueryClient();

  const initialData = useCallback(() => {
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
