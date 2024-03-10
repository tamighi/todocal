import { Resource, ResourceTypes, serviceMap } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ServiceMutateFns = {
  [K in keyof typeof serviceMap]: (typeof serviceMap)[K]["mutate"];
};

interface MutateOptions<R extends Resource> {
  onSuccess?: (data: ResourceTypes[R]) => void;
  onError?: (error: unknown) => void;
}

export const useMutate = <R extends Resource>(
  resource: R,
  options: MutateOptions<R> = {},
) => {
  const { onSuccess: onSuccessProp, onError } = options;

  const queryClient = useQueryClient();

  const onSuccess = (data: ResourceTypes[R]) => {
    onSuccessProp?.(data);
    queryClient.invalidateQueries({ queryKey: [resource, "list"] });
  };

  const mutation = useMutation({
    //@ts-expect-error Idk how to fix, maybe use mutationFn type from react query
    mutationFn: (p: Parameters<ServiceMutateFns[R]>[0]) =>
      serviceMap[resource].mutate(p),
    onSuccess,
    onError,
  });

  return mutation;
};
