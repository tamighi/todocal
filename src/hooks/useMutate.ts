import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ServiceMutateFns = {
  [K in keyof typeof serviceMap]: (typeof serviceMap)[K]["mutate"];
};

export const useMutate = <R extends Resource>(resource: R) => {
  const queryClient = useQueryClient();

  const onSuccess = (data: Awaited<ReturnType<ServiceMutateFns[R]>>) => {
    const oldData = queryClient.getQueryData<ResourceTypes[R][]>([resource]);

    if (oldData) {
      const itemIndexToUpdate = oldData.findIndex(
        (item) => item.id === data.id,
      );

      if (itemIndexToUpdate !== -1) {
        oldData[itemIndexToUpdate] = { ...oldData[itemIndexToUpdate], ...data };
      } else {
        queryClient.setQueryData([resource], () => {
          return [...oldData, data];
        });
      }
    }

    queryClient.invalidateQueries({ queryKey: [resource] });
  };

  const mutation = useMutation({
    //@ts-expect-error TS can't infer return types properly
    mutationFn: (p: Parameters<ServiceMutateFns[R]>[0]) =>
      serviceMap[resource].mutate(p),
    onSuccess: onSuccess,
  });

  return mutation;
};
