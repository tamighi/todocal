import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ServiceCreateFns = {
  [K in keyof typeof serviceMap]: (typeof serviceMap)[K]["create"];
};

export const useCreate = <R extends Resource>(resource: R) => {
  const queryClient = useQueryClient();

  const onSuccess = (data: ReturnType<ServiceCreateFns[R]>) => {
    const oldData = queryClient.getQueryData<ResourceTypes[R][]>([resource]);

    if (oldData) {
      queryClient.setQueryData([resource], () => {
        return [...oldData, data];
      });
    }
  };

  const mutation = useMutation({
    //@ts-expect-error TS does not understand.
    mutationFn: (p: Parameters<ServiceCreateFns[R]>[0]) =>
      serviceMap[resource].create(p),
    onSuccess: onSuccess,
  });

  return mutation;
};
